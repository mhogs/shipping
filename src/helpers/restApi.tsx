
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { endPointType, userType } from "./types";

const BACKEND_BASE_URL = "http://192.168.3.36:3000"
const USER_KEY = "current_user"
export async function getHeaders(): Promise<AxiosRequestHeaders | undefined> {
    const user_str = await AsyncStorage.getItem(USER_KEY)
    const cuurentUser: userType = user_str !== null ? JSON.parse(user_str) : null
    if (cuurentUser !== null)
        return {
            "Authorization": `JWT ${cuurentUser.token}`
        }
}



export class Apis {

    static async login(endpoint: endPointType): Promise<AxiosResponse<any, any>> {
        const { methode, route, data } = endpoint
        if (methode !== "POST")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/${route}`, data)
            return response
        } catch (err: any) {
            return err.message
        }
    }
    static async logout(endpoint: endPointType): Promise<any> {
        const { methode, route, data } = endpoint
        if (methode !== "POST")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/${route}`, data)
            return response.data
        } catch (err: any) {
            return err.message
        }
    }
    static async getMe(endpoint: endPointType): Promise<any> {
        const { methode, route } = endpoint
        if (methode !== "GET")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/${route}`, {
                headers:  await getHeaders(),
            })
            return response.data
        } catch (err: any) {
            throw new Error(
                JSON.stringify(
                    {
                        data: err.response?.data,
                        status: err.response?.status
                    }
                ));
        }
    }
    static async get_all(endpoint: endPointType): Promise<any> {
        const { methode, route } = endpoint
        if (methode !== "GET")
            throw new Error("HTTP Method not supported!.");
        try {
            const { data } = await axios.get(`${BACKEND_BASE_URL}/${route}`, {
                headers: await getHeaders(),
            })
            return data
        } catch (err: any) {
            return err.message
        }
    }

    static async filter(endpoint: endPointType): Promise<any> {
        const { methode, params, route } = endpoint
        if (methode !== "GET")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/${route}`, {
                params: params,
                headers: await getHeaders(),
            })
            return response.data
        } catch (err: any) {
            throw new Error(
                JSON.stringify(
                    {
                        data: err.response?.data,
                        status: err.response?.status
                    }
                ));
        }
    }
    static async get_one(endpoint: endPointType): Promise<any> {
        const { methode, params, route } = endpoint
        if (methode !== "GET")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/${route}/${params.id}`, {
                headers: await getHeaders(),
            })
            return response.data
        } catch (err: any) {
            return (err.message)
        }
    }
    static async create_one(endpoint: endPointType): Promise<any> {
        const { methode, route, data, extra_headers } = endpoint

        if (methode !== "POST")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/${route}`, data, {
                headers: { ...await getHeaders(), ...extra_headers },
            })
            return response.data
        } catch (err: any) {
            return (err.message)
        }
    }
    static async update_one(endpoint: endPointType): Promise<any> {
        const { methode, route, params, data, extra_headers = {} } = endpoint

        if (methode !== "PUT")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.put(`${BACKEND_BASE_URL}/${route}/${params.id}/`, data, {
                headers: { ...await getHeaders(), ...extra_headers },
            })
            return response.data
        } catch (err: any) {
            return (err.message)
        }
    }
    static async delete_one(endpoint: endPointType): Promise<any> {
        const { methode, route, params } = endpoint
        if (methode !== "DELETE")
            throw new Error("HTTP Method not supported!.");
        try {
            const response = await axios.delete(`${BACKEND_BASE_URL}/${route}/${params.id}`, {
                headers: await getHeaders(),
            })
            return response.data
        } catch (err: any) {
            throw new Error(
                JSON.stringify(
                    {
                        data: err.response?.data,
                        status: err.response?.status
                    }
                ));
        }
    }

}



