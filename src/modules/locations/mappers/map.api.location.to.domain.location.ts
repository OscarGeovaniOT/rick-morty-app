import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";
import { LocationDomainModel } from "../models/location.domain.model";

export function mapApiLocationToDomainLocation(
  location: LocationRickMortyType
): LocationDomainModel {
  return {
    id: location.id,
    name: location.name,
    type: location.type,
    dimension: location.dimension,
    created: location.created,
  };
}
