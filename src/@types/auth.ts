export type userType = {
    access?: string
    refresh?: string
    phonenumber?: string,
    id?: number,
    first_name?: string,
    last_name?: string
    picture?:string
}
export type currentUserType = userType | null
/** signup */
export type SignUpRequestDataType = {
    phonenumber: string,
    password: string,
    first_name: string,
    last_name: string
}
export type SignUpResponseDataType = {
    phonenumber: string,
    id: number,
    first_name: string,
    last_name: string
}
/** sign in */
export type SignInRequestDataType = {
    phonenumber: string,
    password: string
}
export type SignInResponseDataType = {
    access: string,
    refresh: string
}
/** refresh token */
export type RefreshRequestDataType = {
    refresh?: string
}
export type RefreshResponseDataType = {
    access: string
}
/** otp */
export type RequestOtpParmsType = {
    phone: string
}
export type SendOtpParmsType = {
    phone: string,
    code: number
}
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