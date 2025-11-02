import { LocationBdModel } from "../../../database/models/location.bd.model";
import { LocationDomainModel } from "../models/location.domain.model";

export function mapBdLocationToDomainLocation(
  location: LocationBdModel
): LocationDomainModel {
  return {
    id: location.id,
    name: location.name,
    type: location.type,
    dimension: location.dimension,
    created: location.created,
  };
}
