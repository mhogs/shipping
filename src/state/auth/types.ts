export type userType={
    token:string
    first_name:string
    last_name:string
    phonenumber:string
    is_active?:boolean
}
export type currentUserType = userType | null