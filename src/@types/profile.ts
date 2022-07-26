import { SignInResponseDataType, userType } from "./auth"

/** profile */
export type ProfileRequestData = SignInResponseDataType
export type ProfileResponseData = userType
export type changePasswordRequestType = {
    current_password: string
    new_password: string
    re_new_password: string
}

export type updateProfileRequestDataType = {
    first_name?: string
    last_name?: string
    picture?: any
    phonenumber?:string
}
export type updateProfileResponseDataType = {
    first_name?: string
    last_name?: string
    picture?: any
    phonenumber?:string,
    id:number
}