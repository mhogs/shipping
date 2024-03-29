import { locationType } from "./map"


export type PackageType = {
    id?: number
    name: string,
    weight: number
    length: number
    width: number
    height: number
}

export type ServiceType = {
    name: string,
    icon: string
    id: number
}

export type orderStateType = "delivered" | "on_progress" | "pending"|"draft"
export type OrdersRequestDataType = {
    creator?: number
    description?: string
    state?: orderStateType
    made_to?: number
    price?: number
    payed?: number
    canceled?: boolean
    package?: PackageType
    service?: number
    pickup?: locationType
    destination?: locationType
}
export type OrdersResponseDataType = OrdersRequestDataType & {
    id: number,
    created_at?: string,
    updated_at?: string,
    code?: string,
    creator?: number,
    creator_details?: {
        phonenumber: string
    },
}

export type orderHistoryFilterType = {
    made_to?: number,
    state?: orderStateType,
    creator?: number,
    search?:string
}