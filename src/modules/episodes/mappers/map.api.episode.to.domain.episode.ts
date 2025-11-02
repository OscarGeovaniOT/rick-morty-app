import { EpisodeRickMortyType } from "../../../api/clients/types/episode/episode.rickmorty.type";
import { EpisodeDomainModel } from "../models/episode.domain.model";

export function mapApiEpisodeToDomainEpisode(
  episode: EpisodeRickMortyType
): EpisodeDomainModel {
  return {
    id: episode.id,
    name: episode.name,
    air_date: episode.air_date,
    episode: episode.episode,
    // characters: episode.characters,
  };
}
