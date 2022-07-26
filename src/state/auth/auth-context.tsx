import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useMemo, useState } from "react"
import { useMutation, } from '@tanstack/react-query'

import { currentUserType, RequestOtpParmsType, SendOtpParmsType, SignInRequestDataType, SignUpRequestDataType } from "../../@types"
import { AuthService, ProfileServices } from "../../services"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_STORAGE_KEY } from "../../constants"
import { LoadingView } from "../../components/util"
import { getUserFromStorage } from "../../helpers"

type AuthContextType = {
    currentUser: currentUserType
    setCurrentUser: Dispatch<SetStateAction<currentUserType>>
    signUp: (data: SignUpRequestDataType) => void
    signIn: (data: SignInRequestDataType) => void
    signOut: () => void
    sendOTP: (data: SendOtpParmsType) => void
    requestOTP: (data: RequestOtpParmsType) => void
    serverState: {
        isLoading: boolean,
        otp_recieved: boolean,
        otp_confirmed: boolean
    }
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    setCurrentUser: () => { },
    signUp: (data: SignUpRequestDataType) => { },
    signIn: (data: SignInRequestDataType) => { },
    signOut: () => { },
    sendOTP: (data: SendOtpParmsType) => { },
    requestOTP: (data: RequestOtpParmsType) => { },
    serverState: {
        isLoading: false,
        otp_recieved: false,
        otp_confirmed: false
    }
})


export const AuthProvider: FC<{}> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<currentUserType>(null)
    const [loadingState, setLoadingState] = useState<boolean>(true)


    const { mutate: signup_mutate, isLoading: signuping } = useMutation(AuthService.SignUp, {
        onSuccess: (data) => {
            request_otp_mutate({ phone: data.phonenumber })
        },
        onError: (err: any) => {

        },
    })

    const { mutate: get_profile_mutation, isLoading: geting_profile } = useMutation(ProfileServices.GetMe, {
        onSuccess: (data) => {
            setCurrentUser(prev => ({ ...prev, ...data }))
        },
        onError: (err: any) => {

        },
    })

    const { mutate: signin_mutate, isLoading: signing } = useMutation(AuthService.SignIN, {
        onSuccess: (data) => {
            setCurrentUser(prev => ({ ...prev, ...data }))
            get_profile_mutation(data)
        },
        onError: (err: any) => {

        }
    })
    const { mutate: signout_mutate, isLoading: signing_out } = useMutation(AuthService.SignOut, {
        onSuccess: (data) => {
            setCurrentUser(null)
        },
        onError: (err: any) => {

        }
    })
    const { mutate: request_otp_mutate, isLoading: requesting, isSuccess: otp_recieved } = useMutation(AuthService.RequestOTP, {
        onSuccess: (data) => {

        },
        onError: (err: any) => {

        }
    })

    const { mutate: send_otp_mutate, isLoading: sending, isSuccess: otp_confirmed } = useMutation(AuthService.SendOTP, {
        onSuccess: (data) => {

        },
        onError: (err: any) => {

        }
    })

    const { mutateAsync: refresh_token_mutate } = useMutation(AuthService.RefreshToken, {
        onSuccess: (data) => {
            setCurrentUser(prev => ({ ...prev, access: data.access }))
        },
        onError: (err: any) => {

        }

    })

    const signUp = (data: SignUpRequestDataType) => {
        signup_mutate(data)
    }

    const signIn = (data: SignInRequestDataType) => {
        signin_mutate(data)
    }
    const signOut = () => {
        signout_mutate()
    }

    const sendOTP = (data: SendOtpParmsType) => {
        send_otp_mutate(data)
    }
    const requestOTP = (data: RequestOtpParmsType) => {
        request_otp_mutate(data)
    }


    const contextValue =
    {
        currentUser,
        setCurrentUser,
        serverState: {
            isLoading: signuping || sending || requesting || geting_profile || signing || signing_out,
            otp_confirmed,
            otp_recieved
        },
        signUp,
        signIn,
        signOut,
        sendOTP,
        requestOTP,
    }

    useEffect(() => {
        async function loadUser() {
            const user= await getUserFromStorage()
            if (user === null) {
                setLoadingState(false)
                return
            }
            setCurrentUser(user)
            setLoadingState(false)
        }
        loadUser()
    }, [])



    return (
        <AuthContext.Provider value={contextValue}>
            {loadingState ? <LoadingView /> : children}
        </AuthContext.Provider>
    )
}



export const useAuthentication = () => useContext(AuthContext)