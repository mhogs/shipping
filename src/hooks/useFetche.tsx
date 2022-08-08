import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { PaginatedResponse, paginationParams } from "../@types"
import { matrixToList } from "../helpers"
import { GenricService } from "../services"

/** params == queryname , filter object, route, limit=10, offset=0 */
export function useInfinitFetche<T>(queryName: string,route: string, filter: any,  limit: number = 10, offset: number = 0) {

    const QUERY_QEY = filter ? [queryName, ...Object.keys(filter).map(key => `${key}=${JSON.stringify(filter[key])}`)] : [queryName]
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
        ({ pageParam = query_params }: any) => GenricService.fetchInfinit<T>(route, pageParam), {
        getNextPageParam: (lastPage, pages) => lastPage.next || undefined,
    })
    
    const resultsCount = data?.pages.length ? data?.pages[0].count : 0
    const results_table = data?.pages.map(item => item.results)
    const results = matrixToList(results_table)
    return { results, isLoading, isFetchingNextPage, fetchNextPage, refetch, error, hasNextPage, resultsCount }
}


/** params == queryname ,route, filter object, */
export function useFetche<T>(queryName: string, route: string, filter: any = {}) {

    const QUERY_QEY = [queryName, ...Object.values(filter || {})]
    const query_params = { ...filter }
    const {
        data,
        error,
        isLoading,
        refetch,
    } = useQuery<T[], Error>(
        QUERY_QEY,
        () => GenricService.fetch<T>(route, filter), {
        retry: 1
    })

    return { data, isLoading, refetch }
}


export function useFetchOne<T>(queryName: string, route: string, filter: any = {}) {

    let QueryFunction = () => GenricService.fetchOneByParams<T>(route, filter)

    if (filter.id !== undefined && typeof filter.id === "number")
        QueryFunction = () => GenricService.fetchOneById<T>(route, filter.id)

    const QUERY_QEY = [queryName, ...Object.values(filter || {})]

    const {
        data,
        error,
        isLoading,
        refetch,
    } = useQuery<T, Error>(
        QUERY_QEY,
        QueryFunction, {
        retry: 1
    })

    return { data, isLoading, refetch }
}