
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { changePasswordRequestType, currentUserType, ProfileRequestData, ProfileResponseData, RefreshRequestDataType, RefreshResponseDataType, RequestOtpParmsType, SendOtpParmsType, SignInRequestDataType, SignInResponseDataType, SignUpRequestDataType, SignUpResponseDataType, updateProfileRequestDataType, updateProfileResponseDataType, userType } from "../@types"
import { BACKEND_BASE_URL, USER_STORAGE_KEY } from "../constants"
import { createFormData, extractErrorMessage, getAuthHeaders, getUserFromStorage, showErrorToast, showsuccessToast } from "../helpers"


export class ProfileServices {

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
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async changePassword(data: changePasswordRequestType):Promise<void> {
        const url = `${BACKEND_BASE_URL}/auth/users/set_password/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const res = await axios.post(url, data, {
                headers: { ...AuthHeaders }
            })
            showsuccessToast("password updated")
            return res.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

    static async updateProfile(data: updateProfileRequestDataType): Promise<updateProfileResponseDataType>  {
        const url = `${BACKEND_BASE_URL}/auth/users/me/`
        const AuthHeaders = await getAuthHeaders()
        try {
            const formdata=createFormData(data)
            console.log("********************")
            console.log(formdata);
            const res = await axios.patch(url,formdata, {
                headers: { ...AuthHeaders,'content-type': 'multipart/form-data'}
            })
            showsuccessToast("profile updated")
            return res.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }

}











