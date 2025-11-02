import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { PaginatedLocationsType } from "../../../api/clients/types/location/paginated.location.rickmorty.type";
import {
  getLocations,
  insertLocation,
} from "../../../database/repository/location.repository";
import { mapApiLocationToDomainLocation } from "../mappers/map.api.location.to.domain.location";
import { mapBdLocationToDomainLocation } from "../mappers/map.bd.location.to.domain.location";
import { mapDomainLocationToDbLocation } from "../mappers/map.domain.location.to.db.location";
import { LocationDomainModel } from "../models/location.domain.model";

export const useLocations = () => {
  const [locations, setLocations] = useState<LocationDomainModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLocations(page);
  }, [page]);

  const fetchLocations = async (pageNum: number) => {
    try {
      if (loading || !hasMore) return;

      setLoading(true);
      setError(null);

      //intentamos leer de la bd local
      const cached = await getLocations((pageNum - 1) * 20, 20);
      if (cached.length) {
        const domainLocations = cached.map(mapBdLocationToDomainLocation);
        setLocations((prevLocations) => [...prevLocations, ...domainLocations]);
        return;
      }

      //Si no hay cache,pedir del api
      const response: PaginatedLocationsType =
        await rickMortyService.getAllLocations(pageNum);

      const domainLocations = response.results.map(
        mapApiLocationToDomainLocation
      );
      setLocations((prevLocations) => [...prevLocations, ...domainLocations]);

      //Guardar en sqlite para uso offline
      for (const location of domainLocations) {
        const dbLocation = mapDomainLocationToDbLocation(location);
        await insertLocation(dbLocation);
      }

      // setPage(pageNum + 1);
      setHasMore(!!response.info.next);
    } catch (error: any) {
      setError(error.message || "Error fetching locations");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  return {
    locations,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
