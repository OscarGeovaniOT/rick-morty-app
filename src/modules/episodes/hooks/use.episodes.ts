import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";
import { PaginatedLocationsType } from "../../../api/clients/types/location/paginated.location.rickmorty.type";
import { EpisodeRickMortyType } from "../../../api/clients/types/episode/episode.rickmorty.type";
import { PaginatedEpisodesType } from "../../../api/clients/types/episode/paginated.episode.rickmorty.type";

export const useEpisodes = () => {
    const [episodes, setEpisodes] = useState<EpisodeRickMortyType[]>([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchEpisodes(page)
    }, [page]);

    const fetchEpisodes = async (pageNum: number) => {
        if (loading || !hasMore) return

        setLoading(true)
        setError(null)

        try {
            const response: PaginatedEpisodesType = await rickMortyService.getAllEpisodes(pageNum);
            setEpisodes(prevEpisodes => [...prevEpisodes, ...response.results]);
            setPage(pageNum + 1);
            setHasMore(!!response.info.next);
        } catch (error: any) {
            setError(error.message || "Error fetching episodes");
        } finally {
            setLoading(false);
        }
    }

    const loadMore = () => {
        if (!loading && hasMore) setPage((prev) => prev + 1)
    }

    return {
        episodes,
        loading,
        error,
        hasMore,
        loadMore,
    }
}