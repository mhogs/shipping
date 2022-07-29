
import axios from "axios"
import { faqCategoriesResponseDataType, faqRequestParmsType, faqResponseDataType, PaginatedResponse, paginationParams } from "../@types"
import { BACKEND_BASE_URL } from "../constants"
import { extractErrorMessage, getAuthHeaders, showErrorToast, showsuccessToast } from "../helpers"




export class GenricServices {

    static async fetchInfinit<T>(pageParam: any | string): Promise<PaginatedResponse<T>> {
        let url = ""
        const AuthHeaders = await getAuthHeaders()
        let query_parms = {}
        const ready_url = typeof pageParam === "string"
        if (ready_url) {
            url = pageParam
        }
        else {
            const { route, ...rest_params } = pageParam
            url = `${BACKEND_BASE_URL}${route}`
            query_parms = rest_params
        }

        try {
            return await (await axios.get(url, { params: { ...query_parms }, headers: { ...AuthHeaders } })).data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async fetch<T>(route: string, filter: any): Promise<T[]> {
        const url = `${BACKEND_BASE_URL}${route}`
        const AuthHeaders = await getAuthHeaders()
        try {
            
            return await (await axios.get(url,
                {
                    params: { ...filter },
                    headers: { ...AuthHeaders }
                })
            ).data

        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }




}











