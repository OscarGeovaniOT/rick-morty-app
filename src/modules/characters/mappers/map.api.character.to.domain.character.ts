import { CharacterRickMortyType } from "../../../api/clients/types/character/character.rickmorty.type";
import { CharacterDomainModel } from "../models/character.domain.model";

export function mapApiCharacterToDomainCharacter(
  character: CharacterRickMortyType
): CharacterDomainModel {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
    image: character.image,
  };
}
