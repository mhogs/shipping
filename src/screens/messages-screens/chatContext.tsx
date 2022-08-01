import { createContext, Dispatch, FC, useContext, useMemo, useReducer, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { defaultTheme, ThemeType } from "../../theme";

type ChatContextType = {
    messages: IMessage[]
    dispatch: Dispatch<actionType>
}
const ChatContext = createContext<ChatContextType>({
    messages: [],
    dispatch: () => { },
})

export const ChatProvider: FC<{}> = (props) => {
    const [messages, dispatch] = useReducer<(state: IMessage[], action: actionType) => IMessage[], IMessage[]>(reducer, [], () => [])


    const contextValue: ChatContextType = useMemo(() => (
        {
            messages,
            dispatch,
        }
    ), [messages])
    return (
        <ChatContext.Provider value={contextValue}>
            {props.children}
        </ChatContext.Provider>
    )
}


type actionType = {
    type: "SET" | "PUSH" | "MARK_AS_SENT" | "MARK_as_READ",
    payload?: { messages?: IMessage[], message?: IMessage, mid?: number }

}
export const useChat = () => useContext(ChatContext)

function reducer(state: IMessage[], action: actionType): IMessage[] {
    const { type, payload } = action
    switch (type) {
        case 'SET':
            return payload?.messages || []
        case 'PUSH':
            if (payload?.message)
                return [...state, payload?.message]
            return state
        case 'MARK_as_READ':
            return state.map(m => {
                if (m._id === payload?.mid)
                    return { ...m, received: true }
                return m
            })
        case 'MARK_AS_SENT':
            return state.map(m => {
                if (m._id === payload?.mid)
                    return { ...m, sent: true }
                return m
            })
    }
}