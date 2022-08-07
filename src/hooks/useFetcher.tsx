import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { PaginatedResponse, paginationParams } from "../@types"
import { matrixToList } from "../helpers"
import { GenricServices } from "../services"

/** params == queryname ,route, filter object, */
export function useFetcher<T>(queryName: string, route: string, filter: any = {}) {

    const QUERY_QEY = [queryName, ...Object.values(filter || {})]
    const query_params = { ...filter }
    const {
        data,
        error,
        isLoading,
        refetch,
    } = useQuery<T[], Error>(
        QUERY_QEY,
        () => GenricServices.fetch<T>(route, filter), {
        retry: 1
    })

    return { data, isLoading, refetch }
}
export function useFetchOne<T>(queryName: string, route: string, filter: any = {}) {

    let QueryFunction = () => GenricServices.fetchOneByParams<T>(route, filter)

    if (filter.id !== undefined && typeof filter.id === "number")
        QueryFunction = () => GenricServices.fetchOneById<T>(route, filter.id)

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