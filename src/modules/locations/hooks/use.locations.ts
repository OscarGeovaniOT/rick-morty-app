import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";
import { PaginatedLocationsType } from "../../../api/clients/types/location/paginated.location.rickmorty.type";

export const useLocations = () => {
    const [locations, setLocations] = useState<LocationRickMortyType[]>([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchLocations(page)
    }, [page]);

    const fetchLocations = async (pageNum: number) => {
        if (loading || !hasMore) return

        setLoading(true)
        setError(null)

        try {
            const response: PaginatedLocationsType = await rickMortyService.getAllLocations(pageNum);
            setLocations(prevLocations => [...prevLocations, ...response.results]);
            setPage(pageNum + 1);
            setHasMore(!!response.info.next);
        } catch (error: any) {
            setError(error.message || "Error fetching locations");
        } finally {
            setLoading(false);
        }
    }

    const loadMore = () => {
        if (!loading && hasMore) setPage((prev) => prev + 1)
    }

    return {
        locations,
        loading,
        error,
        hasMore,
        loadMore,
    }
}