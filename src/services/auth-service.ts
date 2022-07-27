import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosError } from "axios"
import { changePasswordRequestType, checkUserRequestType, checkUserResponseType, currentUserType, ProfileRequestData, ProfileResponseData, RefreshRequestDataType, RefreshResponseDataType, RequestOtpParmsType, SendOtpParmsType, SignInRequestDataType, SignInResponseDataType, SignUpRequestDataType, SignUpResponseDataType, userType } from "../@types"
import { BACKEND_BASE_URL, USER_STORAGE_KEY } from "../constants"
import { extractErrorMessage, getAuthHeaders, getUserFromStorage, showErrorToast, showsuccessToast } from "../helpers"
import Toast from 'react-native-toast-message';

export class AuthService {
    static async CheckUser(params: checkUserRequestType): Promise<checkUserResponseType> {
        const url = `${BACKEND_BASE_URL}/auth/check_user/${params.phonenumber}`
        try {
            const res = await axios.get(url)
            return res.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    static async SignUp(data: SignUpRequestDataType): Promise<SignUpResponseDataType> {
        const url = BACKEND_BASE_URL + "/auth/users/"
        try {
            const res = await axios.post(url, data)
            return res.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    static async SignIN(data: SignInRequestDataType): Promise<SignInResponseDataType> {
        const url = `${BACKEND_BASE_URL}/auth/jwt/create/`
        try {
            const res = await axios.post(url, data)
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.data))
            return res.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }



    static async SignOut(): Promise<void> {
        try {
           await AsyncStorage.removeItem(USER_STORAGE_KEY)
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
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
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async RequestOTP(params: RequestOtpParmsType): Promise<void> {
        const url = `${BACKEND_BASE_URL}/auth/send_sms_code/${params.phone}`
        try {
            return (await axios.get(url)).data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async SendOTP(params: SendOtpParmsType) {
        const url = `${BACKEND_BASE_URL}/auth/verify_phone/${params.phone}/${params.code}`
        try {
            return (await axios.get(url)).data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    
}











