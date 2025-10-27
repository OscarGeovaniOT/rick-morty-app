import { LocationRickMortyType } from "./location.rickmorty.type";

export interface PaginatedLocationsType {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: LocationRickMortyType[];
}