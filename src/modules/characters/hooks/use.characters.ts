import { useEffect, useState } from "react";
import { CharacterRickMortyType } from "../../../api/clients/types/character.rickmorty.type";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { PaginatedCharacters } from "../../../api/clients/types/paginated.character.rickmorty.type";

export const useCharacters = () => {
    const [characters, setCharacters] = useState<CharacterRickMortyType[]>([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchCaracters(page)
    }, [page]);



    const fetchCaracters = async (pageNum: number) => {
        if (loading || !hasMore) return

        setLoading(true)
        setError(null)


        try {
            const response: PaginatedCharacters = await rickMortyService.getAllCharacters(pageNum);
            setCharacters(prevCharacters => [...prevCharacters, ...response.results]);
            setPage(pageNum + 1);
            setHasMore(!!response.info.next);
        } catch (error: any) {
            setError(error.message || "Error fetching characters");
        } finally {
            setLoading(false);
        }
    }


    const loadMore = () => {
        if (!loading && hasMore) setPage((prev) => prev + 1)
    }


    return {
        characters,
        loading,
        error,
        hasMore,
        loadMore,
    }
}