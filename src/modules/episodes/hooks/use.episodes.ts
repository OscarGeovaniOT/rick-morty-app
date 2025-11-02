import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { PaginatedEpisodesType } from "../../../api/clients/types/episode/paginated.episode.rickmorty.type";
import {
  getEpisodes,
  insertEpisode,
} from "../../../database/repository/episode.repository";
import { mapApiEpisodeToDomainEpisode } from "../mappers/map.api.episode.to.domain.episode";
import { mapBDEpisodeToDomainEpisode } from "../mappers/map.bd.episode.to.domain.episode";
import { mapDomainEpisodeToDbEpisode } from "../mappers/map.domain.episode.to.db.episode";
import { EpisodeDomainModel } from "../models/episode.domain.model";

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<EpisodeDomainModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  const fetchEpisodes = async (pageNum: number) => {
    try {
      if (loading || !hasMore) return;

      setLoading(true);
      setError(null);

      //intentamos leer de la bd local
      const cached = await getEpisodes((pageNum - 1) * 20, 20);
      if (cached.length) {
        const domainEpisodes = cached.map(mapBDEpisodeToDomainEpisode);
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...domainEpisodes]);
        return;
      }

      //Si no hay cache,pedir del api
      const response: PaginatedEpisodesType =
        await rickMortyService.getAllEpisodes(pageNum);

      const domainEpisodes = response.results.map(mapApiEpisodeToDomainEpisode);
      setEpisodes((prevEpisodes) => [...prevEpisodes, ...domainEpisodes]);

      //Guardar en sqlite para uso offline
      for (const episode of domainEpisodes) {
        const dbEpisode = mapDomainEpisodeToDbEpisode(episode);
        await insertEpisode(dbEpisode);
      }

      // setPage(pageNum + 1);
      setHasMore(!!response.info.next);
    } catch (error: any) {
      setError(error.message || "Error fetching episodes");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return {
    episodes,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
