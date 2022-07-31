
import axios from "axios"
import {  PaginatedResponse } from "../@types"
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
    
    static async fetchOne<T>(params:{route:string,id:number}): Promise<T> {
        const url = `${BACKEND_BASE_URL}${params.route}/${params.id}`
        
        const AuthHeaders = await getAuthHeaders()
        try {
            
            return await (await axios.get(url,
                {
                    headers: { ...AuthHeaders }
                })
            ).data

        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    static async PostOne<REQ_BODY,RES_BODY>(route:string,data:REQ_BODY): Promise<RES_BODY> {
        const url = `${BACKEND_BASE_URL}${route}`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.post(url,data, {
                headers: { ...AuthHeaders },
            })
            showsuccessToast("created")
            return response.data
            
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }




}











