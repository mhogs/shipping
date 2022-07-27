
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { changePasswordRequestType, currentUserType, OrdersRequestDataType, OrdersResponseDataType, ProfileRequestData, ProfileResponseData, RefreshRequestDataType, RefreshResponseDataType, RequestOtpParmsType, SendOtpParmsType, ServiceType, SignInRequestDataType, SignInResponseDataType, SignUpRequestDataType, SignUpResponseDataType, updateProfileRequestDataType, updateProfileResponseDataType, userType } from "../@types"
import { BACKEND_BASE_URL, USER_STORAGE_KEY } from "../constants"
import { createFormData, extractErrorMessage, getAuthHeaders, getUserFromStorage, showErrorToast, showsuccessToast } from "../helpers"




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
            return response.data
            showsuccessToast("Order saved ")
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











