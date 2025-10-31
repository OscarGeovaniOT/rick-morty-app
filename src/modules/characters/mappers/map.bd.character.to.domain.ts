import { CharacterBbModel } from "../../../database/models/character.bd.model";
import { CharacterDomainModel } from "../models/character.domain.model";

export function mapBDCharacterToDomain(
  character: CharacterBbModel
): CharacterDomainModel {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type,
    gender: character.gender,
    origin: character.origin,
    location: character.location,
    image: character.image,
  };
}
