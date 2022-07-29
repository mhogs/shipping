import { useInfiniteQuery } from "@tanstack/react-query"
import { PaginatedResponse, paginationParams } from "../@types"
import { matrixToList } from "../helpers"
import { GenricServices } from "../services"

/** params == queryname , filter object, route, limit=10, offset=0 */
export function useInfinitFetcher<T>(queryName: string, filter: any, route: string, limit: number = 10, offset: number = 0,) {

    const QUERY_QEY = [queryName, ...Object.keys(filter).map(key => `${key}=${JSON.stringify(filter[key])}`)]
    const query_params = { ...filter, limit, offset }
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
    } = useInfiniteQuery<PaginatedResponse<T>, Error>(
        QUERY_QEY,
        ({ pageParam = { ...query_params, route } }: any) => GenricServices.fetchInfinit<T>(pageParam), {
        getNextPageParam: (lastPage, pages) => lastPage.next || undefined
    })

    const results_table = data?.pages.map(item => item.results)
    const results = matrixToList(results_table)
    return { results, isLoading, isFetchingNextPage, fetchNextPage, refetch, error, hasNextPage }
}