import { ApiClient } from "../api.client";
import { CharacterRickMortyType } from "./types/character/character.rickmorty.type";
import { PaginatedCharactersType } from "./types/character/paginated.character.rickmorty.type";
import { EpisodeRickMortyType } from "./types/episode/episode.rickmorty.type";
import { PaginatedEpisodesType } from "./types/episode/paginated.episode.rickmorty.type";
import { LocationRickMortyType } from "./types/location/location.rickmorty.type";
import { PaginatedLocationsType } from "./types/location/paginated.location.rickmorty.type";
import { RICK_MORTY_API_URL } from "@env";

const rickMortyClient = new ApiClient(RICK_MORTY_API_URL);

export const rickMortyService = {
    getAllCharacters: async (page: number = 1) => {
        return rickMortyClient.get<PaginatedCharactersType>(`/character?page=${page}`);
    },

    getCharacterById: async (id: number) => {
        return rickMortyClient.get<CharacterRickMortyType>(`/character/${id}`);
    },

    searchCharacters: async (name: string) => {
        return rickMortyClient.get<PaginatedCharactersType>(`/character?name=${name}`);
    },


    getAllLocations: async (page: number = 1) => {
        return rickMortyClient.get<PaginatedLocationsType>(`/location?page=${page}`);
    },
    getLocationById: async (id: number) => {
        return rickMortyClient.get<LocationRickMortyType>(`/location/${id}`);
    },
    searchLocation: async (id: number) => {
        return rickMortyClient.get<LocationRickMortyType>(`/location/${id}`);
    },


    getAllEpisodes: async (page: number = 1) => {
        return rickMortyClient.get<PaginatedEpisodesType>(`/episode?page=${page}`);
    },
    getEpisodeById: async (id: number) => {
        return rickMortyClient.get<EpisodeRickMortyType>(`/episode/${id}`);
    },
    searchEpisode: async (name: string) => {
        return rickMortyClient.get<PaginatedEpisodesType>(`/episode?name=${name}`);
    },
}