import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosError } from "axios"
import { currentUserType, ProfileRequestData, ProfileResponseData, RefreshRequestDataType, RefreshResponseDataType, RequestOtpParmsType, SendOtpParmsType, SignInRequestDataType, SignInResponseDataType, SignUpRequestDataType, SignUpResponseDataType, userType } from "../@types"
import { BACKEND_BASE_URL, USER_STORAGE_KEY } from "../constants"
import { getAuthHeaders, getUserFromStorage, showErrorToast } from "../helpers"
import Toast from 'react-native-toast-message';

export class AuthService {
    static async SignUp(data: SignUpRequestDataType): Promise<SignUpResponseDataType> {
        const url = BACKEND_BASE_URL + "/auth/users/"
        try {
            const res = await axios.post(url, data)
            console.log({ status: res.status });

            return res.data
        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }
    }
    static async SignIN(data: SignInRequestDataType): Promise<SignInResponseDataType> {
        const url = `${BACKEND_BASE_URL}/auth/jwt/create/`
        try {
            const res = await axios.post(url, data)
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.data))
            return res.data
        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }
    }

    static async GetMe(data: ProfileRequestData): Promise<ProfileResponseData> {
        const url = `${BACKEND_BASE_URL}/auth/users/me/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const response = await axios.get(url, {
                headers: { ...AuthHeaders }
            })
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...data, ...response.data }))
            return { ...data, ...response.data }

        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }
    }

    static async SignOut(): Promise<void> {
        try {
            await AsyncStorage.removeItem(USER_STORAGE_KEY)
        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }

    }

    static async RefreshToken(): Promise<RefreshResponseDataType> {
        const url = `${BACKEND_BASE_URL}/auth/jwt/refresh/`
        const user = await getUserFromStorage()
        if (user === null) throw Error("user is null");
        const data: RefreshRequestDataType = { refresh: user.refresh }
        try {
            return (await axios.post(url, data)).data
        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }
    }



    static async RequestOTP(params: RequestOtpParmsType): Promise<void> {
        const url = `${BACKEND_BASE_URL}/auth/send_sms_code/${params.phone}`
        try {
            return (await axios.get(url)).data
        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }
    }

    static async SendOTP(params: SendOtpParmsType) {
        const url = `${BACKEND_BASE_URL}/auth/verify_phone/${params.phone}/${params.code}`
        try {
            return (await axios.get(url)).data
        } catch (err: any) {
            const errDetail = err.response?.data?.detail
            showErrorToast(errDetail)
            throw Error(errDetail);
        }
    }

}










