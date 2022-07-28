export interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

export type paginationParams = {
    limit?: number
    offset?: number
} 