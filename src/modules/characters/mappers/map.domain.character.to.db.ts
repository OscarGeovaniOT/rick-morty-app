import { CharacterBbModel } from "../../../database/models/character.bd.model";
import { CharacterDomainModel } from "../models/character.domain.model";

export const mapDomainCharacterToDb = (
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
