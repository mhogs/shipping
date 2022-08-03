import moment from "moment";
import { createContext, Dispatch, FC, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { dialogResponseType, dialogType, MessageSocketResponseType, WS_MSG_TYPE } from "../../@types";
import { WEB_SOCKET_SERVER } from "../../constants";
import { formatMessageApiResponse_To_IMessage, formatSocketMessage_To_IMessage } from "../../helpers";
import { useInfinitFetcher } from "../../hooks";
import { ChatService } from "../../services";
import { useAuthentication } from "../../state";
import { defaultTheme, ThemeType } from "../../theme";

const MESSAGES_API_PAGESIZE = 10
const DIALOG_API_PAGESIZE = 10

type chatStateType = {
    isLoading: boolean,
    can_load_more: boolean,
    loading_more: boolean
}

type ChatContextType = {
    messages: IMessage[]
    dialogs: dialogType[]
    dispatch: Dispatch<actionType>
    isLoading_msgs: boolean,
    can_load_more_msgs: boolean,
    loadMoreMsgs: (filter: { user2: number })=>any,
    loading_more_msgs: boolean,
    socket:WebSocket | null,
    loadMoreDialogs:()=>any,
    loading_more_dialogs:boolean,
    loading_dialogs:boolean,
    refetch_dialogs:()=>void,
}
const ChatContext = createContext<ChatContextType>({
    messages: [],
    dialogs: [],
    dispatch: () => {},
    isLoading_msgs: false,
    can_load_more_msgs: true,
    loadMoreMsgs: (filter: { user2: number })=>{},
    loading_more_msgs: false,
    socket:null,
    loadMoreDialogs:()=>{},
    loading_more_dialogs:false,
    loading_dialogs:false,
    refetch_dialogs:()=>{},
})

export const ChatProvider: FC<{}> = (props) => {
    const { currentUser } = useAuthentication()
    const [socket, setWsocket] = useState<WebSocket | null>(null)
    const [chatState, setChatState] = useState<chatStateType>({ isLoading: false, can_load_more: true, loading_more: false })
    const [messages, dispatch] = useReducer<(state: IMessage[], action: actionType) => IMessage[], IMessage[]>(reducer, [], () => [])
    const {
        results: dialogs_data,
        isLoading: loading_dialogs,
        isFetchingNextPage: loading_more_dialogs,
        fetchNextPage: loadMoreDialogs,
        refetch: refetch_dialogs,
        resultsCount: dialogs_count
    } = useInfinitFetcher<dialogResponseType>("mydialogs", {}, "/chat/dialogs/", DIALOG_API_PAGESIZE)

    const dialogs: dialogType[] | undefined = useMemo(() => dialogs_data?.map(item => ({
        picture: item.other_user.picture,
        fullName: `${item.other_user.first_name} ${item.other_user.last_name}`,
        messageText: item.last_message,
        time: moment.unix(item.created).fromNow(),
        unread: item.unread_count > 0,
        sender: item.other_user
    })), [dialogs_data])

    /** fetsh a page of messages */
    const loadPage = useCallback((filter: { user2: number }) => {
        setChatState(prev => ({ ...prev, loading_more: true }))
        ChatService.fetchMessages({ ...filter, offset: messages.length, limit: MESSAGES_API_PAGESIZE }).then(data => {

            setChatState(prev => ({ ...prev, can_load_more: data.next !== null }))

            const _messages = data.results.map(msg => formatMessageApiResponse_To_IMessage(msg, currentUser?.id))
            dispatch({ type: 'JOIN', payload: { messages: _messages } })
            setChatState(prev => ({ ...prev, loading_more: false }))
        })
    }, [messages, chatState])

    /** manage weSockets events */
    useEffect(() => {
        if (currentUser) {

            const ws = new WebSocket(`${WEB_SOCKET_SERVER}?token=${currentUser?.access}`);
            ws.addEventListener("open", (ev: Event) => {
                setWsocket(ws)
                console.log("connected ........");
            })
            ws.addEventListener("message", (ev: MessageEvent<any>) => {
                const message_data = JSON.parse(ev.data)


                switch (message_data.msg_type as WS_MSG_TYPE) {
                    case WS_MSG_TYPE.MessageIdCreated:
                        dispatch({
                            type: "MARK_AS_SENT",
                            payload: { mid: message_data.random_id, db_id: message_data.db_id }
                        })
                        break;

                    /*case WS_MSG_TYPE.MessageRead:
                        console.log(message_data);
                        dispatch({
                            type: "MARK_AS_READ",
                            payload: { mid: message_data.message_id }
                        })
                        break;*/

                    case WS_MSG_TYPE.TextMessage:
                        const new_recieved_message = formatSocketMessage_To_IMessage(message_data as MessageSocketResponseType)
                        dispatch(
                            {
                                type: "PUSH",
                                payload: { message: new_recieved_message }
                            })
                        break;
                }
            })


            ws.onerror = (ev: Event) => {
                console.log("connected ........");
            }
            ws.onclose = (ev: Event) => {
                console.log("disconnected ........");
            }
            return () => {
                ws.removeEventListener('message', () => { })
                ws.close()
            }
        }
    }, [])

    const contextValue = useMemo(() => ({
        messages,
        isLoading_msgs: chatState.isLoading,
        can_load_more_msgs: chatState.can_load_more,
        loadMoreMsgs: loadPage,
        loading_more_msgs: chatState.loading_more,
        socket,
        dispatch,
        dialogs,
        loadMoreDialogs,
        loading_more_dialogs,
        loading_dialogs,
        refetch_dialogs,
    }), [])

    return (
        <ChatContext.Provider value={contextValue}>
            {props.children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)

type actionType = {
    type: "JOIN" | "PUSH" | "MARK_AS_SENT" | "MARK_AS_READ",
    payload?: { messages?: IMessage[], message?: IMessage, mid?: number, db_id?: number }

}


function reducer(state: IMessage[], action: actionType): IMessage[] {
    const { type, payload } = action
    switch (type) {
        case 'JOIN':
            if (!payload?.messages) return state
            return [...state, ...payload?.messages]

        case 'PUSH':
            if (payload?.message)
                return [payload?.message, ...state]
            return state
        case 'MARK_AS_READ':
            return state.map(m => {
                if (m._id === payload?.mid)
                    return { ...m, received: true }
                return m
            })
        case 'MARK_AS_SENT':
            return state.map(m => {
                if (m._id === payload?.mid)
                    return { ...m, sent: true, _id: payload.db_id as number }
                return m
            })
    }
}