import axios from "axios"
import { OrdersRequestDataType, OrdersResponseDataType, ServiceType } from "../@types"
import { BACKEND_BASE_URL } from "../constants"
import { extractErrorMessage, getAuthHeaders, showErrorToast, showsuccessToast } from "../helpers"




export class OrdersServices {

    static async fetchOrders(params:any): Promise<OrdersResponseDataType[]> {
        const url = `${BACKEND_BASE_URL}/orders/orders`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.get(url, {
                headers: { ...AuthHeaders },
                params:{...params}
            })
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    static async createOrder(data:OrdersRequestDataType): Promise<OrdersResponseDataType> {
        const url = `${BACKEND_BASE_URL}/orders/orders/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.post(url,data, {
                headers: { ...AuthHeaders },
            })
            showsuccessToast("Order saved ")
            return response.data
            
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    /** services */
    static async fetchServices(params:any): Promise<ServiceType[]> {
        const url = `${BACKEND_BASE_URL}/orders/services`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.get(url, {
                headers: { ...AuthHeaders },
                params:{...params}
            })
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

}











