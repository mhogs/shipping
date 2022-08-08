import { OrdersResponseDataType, ServiceType } from "../../@types";
import { useFetche, useFetchOne, useInfinitFetche } from "../useFetche";

export function useServices() {
    const { data, isLoading } = useFetche<ServiceType>("services", "/orders/services")
    return { data, isLoading }
}
export function useInfinitOrders(filter: any) {
    const PAGESIZE = 3
    const result = useInfinitFetche<OrdersResponseDataType>("infinit_orders","/orders/orders", filter, PAGESIZE)
    return result
}
export function useOrders(filter: any) {
    const result = useFetche<OrdersResponseDataType>("orders","/orders/orders" ,filter)
    return result
}
export function useOrderByCode(code: string) {
    const result = useFetchOne<OrdersResponseDataType>("order","/orders/orders/get_by_code", {code} )
    return result
}


