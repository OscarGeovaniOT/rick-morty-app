import { CharacterRickMortyType } from "./character.rickmorty.type";

export interface PaginatedCharactersType {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: CharacterRickMortyType[];
}