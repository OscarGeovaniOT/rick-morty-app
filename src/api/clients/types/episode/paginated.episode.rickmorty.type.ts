import { EpisodeRickMortyType } from "./episode.rickmorty.type";

export interface PaginatedEpisodesType {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: EpisodeRickMortyType[];
}