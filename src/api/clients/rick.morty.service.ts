import { ApiClient } from "../api.client";
import { CharacterRickMortyType } from "./types/character.rickmorty.type";
import { PaginatedCharacters } from "./types/paginated.character.rickmorty.type";
import { RICK_MORTY_API_URL } from "@env";

const rickMortyClient = new ApiClient(RICK_MORTY_API_URL);

export const rickMortyService = {
    getAllCharacters: async (page: number = 1) => {
        return rickMortyClient.get<PaginatedCharacters>(`/character?page=${page}`);
    },

    getCharacterById: async (id: number) => {
        return rickMortyClient.get<CharacterRickMortyType>(`/character/${id}`);
    },

    searchCharacters: async (name: string) => {
        return rickMortyClient.get<PaginatedCharacters>(`/character?name=${name}`);
    }
}