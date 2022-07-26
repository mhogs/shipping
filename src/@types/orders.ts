export type orderStateType="delivered"|"on_progress"|"pending"
export type OrdersResponseDataType = {
    id: 1,
    created_at?: string,
    updated_at?: string,
    code?: string,
    description?: string,
    state?: orderStateType
    creator?: number,
    made_to?: number
}