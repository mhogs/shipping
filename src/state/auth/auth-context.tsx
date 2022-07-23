import { createContext, useContext, useMemo, useReducer } from "react"
import { currentUserType } from "./types"

type authContextType = {
    currentUser: currentUserType
    dispatch: (action: actionType) => void
}

const authContext = createContext<authContextType>({
    currentUser: null,
    dispatch: (action: actionType) => { }
})


export function AuthProvider() {
    const [currentUser, dispatch] = useReducer(reducer, null)
    const contextValue = useMemo(() => (
        {
            currentUser,
            dispatch
        }
    ), [currentUser])
    return (
        <authContext.Provider value={contextValue}>

        </authContext.Provider>
    )
}

type actionType = {
    type: "SIGNIN" | "SIGNUP" | "SIGNOUT"
    payload: any
}

function reducer(state: currentUserType, action: actionType): currentUserType {
    const { type, payload } = action
    switch (type) {
        case "SIGNIN":
            return state
        case "SIGNUP":
            return state
        case "SIGNOUT":
            return null
        default:
            return state
    }
}