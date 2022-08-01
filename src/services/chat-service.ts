import axios from "axios"
import { MessageResponseType, OrdersRequestDataType, OrdersResponseDataType, ServiceType } from "../@types"
import { BACKEND_BASE_URL } from "../constants"
import { extractErrorMessage, getAuthHeaders, showErrorToast, showsuccessToast } from "../helpers"




export class ChatService {

    static async fetchMessages(params:any): Promise<MessageResponseType[]> {
        const url = `${BACKEND_BASE_URL}/chat/messages/`
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











