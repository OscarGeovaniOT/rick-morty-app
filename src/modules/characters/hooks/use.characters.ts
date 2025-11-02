import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { PaginatedCharactersType } from "../../../api/clients/types/character/paginated.character.rickmorty.type";
import {
  getCharacters,
  insertCharacter,
} from "../../../database/repository/character.repository";
import { mapApiCharacterToDomainCharacter } from "../mappers/map.api.character.to.domain.character";
import { mapBDCharacterToDomainCharacter } from "../mappers/map.bd.character.to.domain.character";
// import { mapDomainCharacterToDb } from "../mappers/map.domain.character.to.db";
import { CharacterBbModel } from "../../../database/models/character.bd.model";
import { CharacterDomainModel } from "../models/character.domain.model";

//TODO: Pendiente pasarlo a un archivo separado
// Inline implementation of the missing mapper function
const mapDomainCharacterToDb = (
  char: CharacterDomainModel
): CharacterBbModel => {
  return {
    id: char.id,
    name: char.name,
    status: char.status,
    species: char.species,
    type: char.type,
    gender: char.gender,
    origin: char.name,
    location: char.name,
    image: char.image,
  };
};

export const useCharacters = () => {
  const [characters, setCharacters] = useState<CharacterDomainModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCaracters(page);
  }, [page]);

  const fetchCaracters = async (pageNum: number) => {
    try {
      if (loading || !hasMore) return;

      setLoading(true);
      setError(null);

      //intentamos leer de la bd local
      const cached = await getCharacters((pageNum - 1) * 20, 20);
      if (cached.length) {
        const domainChars = cached.map(mapBDCharacterToDomainCharacter);
        setCharacters((prevCharacters) => [...prevCharacters, ...domainChars]);
        return;
      }

      //Si no hay cache,pedir del api
      const response: PaginatedCharactersType =
        await rickMortyService.getAllCharacters(pageNum);

      const domainChars = response.results.map(
        mapApiCharacterToDomainCharacter
      );
      setCharacters((prevCharacters) => [...prevCharacters, ...domainChars]);

      //Guardar en sqlite para uso offline
      for (const char of domainChars) {
        const dbChar = mapDomainCharacterToDb(char);
        await insertCharacter(dbChar);
      }

      // setPage(pageNum + 1);
      setHasMore(!!response.info.next);
    } catch (error: any) {
      setError(error.message || "Error fetching characters");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return {
    characters,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
