import { EpisodeBdModel } from "../../../database/models/episode.bd.model";
import { EpisodeDomainModel } from "../models/episode.domain.model";

export function mapBDEpisodeToDomainEpisode(
  episode: EpisodeBdModel
): EpisodeDomainModel {
  return {
    id: episode.id,
    name: episode.name,
    air_date: episode.air_date,
    episode: episode.episode,
  };
}
