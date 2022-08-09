import { MessageSocketResponseType, WS_MSG_TYPE } from '../../@types';
import { useAuthentication } from '../../state';
import { IMessage } from 'react-native-gifted-chat';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { WEB_SOCKET_SERVER } from '../../constants';
import { formatMessageApiResponse_To_IMessage, formatSocketMessage_To_IMessage, generateRondomMessageID } from '../../helpers';
import { ChatService } from '../../services/chat-service';


const MESSAGES_API_PAGESIZE = 10
type chatStateType = {
    isLoading: boolean,
    can_load_more: boolean,
    loading_more: boolean
}

export const useMessageDetails = (filter: { user2: number }) => {
    const { currentUser } = useAuthentication()
    const [socket, setWsocket] = useState<WebSocket | null>(null)
    const [chatState, setChatState] = useState<chatStateType>({ isLoading: false, can_load_more: true, loading_more: false })

    const [messages, dispatch] = useReducer<(state: IMessage[], action: actionType) => IMessage[], IMessage[]>(reducer, [], () => [])

    /** fetsh a page of messages */
    const loadPage = useCallback(() => {
        setChatState(prev => ({ ...prev, loading_more: true }))
        ChatService.fetchMessages({ ...filter, offset: messages.length, limit: MESSAGES_API_PAGESIZE }).then(data => {

            setChatState(prev => ({ ...prev, can_load_more: data.next !== null }))

            const _messages = data.results.map(msg => formatMessageApiResponse_To_IMessage(msg, currentUser?.id))
            dispatch({ type: 'JOIN', payload: { messages: _messages } })
            setChatState(prev => ({ ...prev, loading_more: false }))
        })
    }, [messages, chatState])

    const onSend = (msgs: IMessage[] = []) => {
        const random_id = generateRondomMessageID()
        if (msgs.length) {
            const msg = msgs[0]
            dispatch({
                type: 'PUSH',
                payload: {
                    message: { ...msg, _id: random_id }
                }
            })
            if (msg.text != "") {

                socket?.send(JSON.stringify(
                    {
                        msg_type: WS_MSG_TYPE.TextMessage,
                        text: msg.text,
                        user_pk: filter.user2?.toString(),
                        random_id: random_id
                    }
                ))
            }

        }

    }


    /** initialy load first page */
    useEffect(() => {
        loadPage()
    }, [])
    /** mark all visible and  not read msgs as read */
    useEffect(() => {

        if (socket) {
            const unreadMessges = messages.filter(msg => msg.user._id === 2 && !msg.received)
            unreadMessges.map(recieved_msg => {
                if (recieved_msg._id > 0)
                    socket.send(JSON.stringify({
                        msg_type: WS_MSG_TYPE.MessageRead,
                        user_pk: filter.user2?.toString(),
                        message_id: recieved_msg._id
                    }))
            })
        }

    }, [messages])

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
                console.log("error .....");
               
                
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

    return {
        messages,
        isLoading: chatState.isLoading,
        can_load_more: chatState.can_load_more,
        loadMore: loadPage,
        loading_more: chatState.loading_more,
        onSend,
        dispatch,
    }
}


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
                    return { ...m, received:true }
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