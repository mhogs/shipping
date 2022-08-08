
import axios from "axios"
import { PaginatedResponse } from "../@types"
import { BACKEND_BASE_URL } from "../constants"
import { extractErrorMessage, getAuthHeaders, showErrorToast, showsuccessToast } from "../helpers"




export class GenricService {


    static async fetchInfinit<T>(route: string, pageParam: any | string): Promise<PaginatedResponse<T>> {
        let url = `${BACKEND_BASE_URL}${route}/`
        const AuthHeaders = await getAuthHeaders()
        let params = {}
        if (typeof pageParam === "string")
            url = pageParam
        else
            params = pageParam

        try {
            return (await axios.get(url, { params, headers: { ...AuthHeaders } })).data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async fetch<T>(route: string, params: any): Promise<T[]> {
        const url = `${BACKEND_BASE_URL}${route}/`
        const AuthHeaders = await getAuthHeaders()
        try {

            return (await axios.get(url, { params, headers: { ...AuthHeaders } })).data

        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }


    static async fetchOneById<T>(route: string, id: number): Promise<T> {
        const url = `${BACKEND_BASE_URL}${route}/${id}/`
        const AuthHeaders = await getAuthHeaders()
        try {
            return (await axios.get(url, { headers: { ...AuthHeaders } })).data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async fetchOneByParams<T>(route: string, params: any): Promise<T> {
        const url = `${BACKEND_BASE_URL}${route}/`
        const AuthHeaders = await getAuthHeaders()
        try {
            return (await axios.get(url, { params, headers: { ...AuthHeaders }, })).data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async PostOne<REQ_BODY, RES_BODY>(route: string, data: REQ_BODY): Promise<RES_BODY> {
        const url = `${BACKEND_BASE_URL}${route}/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.post(url, data, {
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

    static async PutOne<REQ_BODY, RES_BODY>(route: string, id: number, data: REQ_BODY): Promise<RES_BODY> {
        const url = `${BACKEND_BASE_URL}${route}/${id}/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.put(url, data, {
                headers: { ...AuthHeaders },
            })
            showsuccessToast("updated")
            return response.data

        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async PatchOne<REQ_BODY, RES_BODY>(route: string, id: number, data: REQ_BODY): Promise<RES_BODY> {
        const url = `${BACKEND_BASE_URL}${route}/${id}/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.put(url, data, {
                headers: { ...AuthHeaders },
            })
            showsuccessToast("updated")
            return response.data

        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async DeleteOne<REQ_BODY, RES_BODY>(route: string, id: number): Promise<RES_BODY> {
        const url = `${BACKEND_BASE_URL}${route}/${id}/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.delete(url, {
                headers: { ...AuthHeaders },
            })
            showsuccessToast("deleted")
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
}











