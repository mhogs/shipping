import { useInfinitFetcher, useRefreshOnFocus } from '../../hooks';
import { MessageResponseType, MessageSocketResponseType, userType, ws_incomingChatMsgType, WS_MSG_TYPE } from '../../@types';
import moment from 'moment';
import { useAuthentication } from '../../state';
import { IMessage } from 'react-native-gifted-chat';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { WEB_SOCKET_SERVER } from '../../constants';

import { useQueryClient } from '@tanstack/react-query';

import { formatMessageApiResponse_To_IMessage, formatSocketMessage_To_IMessage } from '../../helpers';
import axios from 'axios';
import { ChatService } from '../../services';

const MESSAGES_API_PAGESIZE = 10

export const useMessageDetails = (filter: { user2: number }) => {
    const { currentUser } = useAuthentication()
    const [socket, setWsocket] = useState<WebSocket | null>(null)
    const [queryPrams,setQueryPrams]=useState(filter)
    const queryClient = useQueryClient()
    const [new_messages, dispatch] = useReducer<(state: IMessage[], action: actionType) => IMessage[], IMessage[]>(reducer, [], () => [])

    const {
        results: data,
        isLoading,
        isFetchingNextPage: loading_more,
        fetchNextPage: loadMore,
        refetch,
        resultsCount,
        hasNextPage: can_load_more
    } = useInfinitFetcher<MessageResponseType>(
        "messages",
        { ...filter },
        "/chat/messages/",
        MESSAGES_API_PAGESIZE
    )

   

    const messages: IMessage[] = useMemo(
        () => [
            ...new_messages,
            ...data.map(msg => formatMessageApiResponse_To_IMessage(msg, currentUser?.id))
        ], [data, new_messages]
    )





    useEffect(() => {
        /** mark all not read msgs as read */
        if (socket) {
            const unreadMessges = messages.filter(msg => msg.user._id === 2 && !msg.received)
            if (unreadMessges.length) {
                unreadMessges.map(recieved_msg => {
                    socket.send(JSON.stringify({
                        msg_type: WS_MSG_TYPE.MessageRead,
                        user_pk: filter.user2?.toString(),
                        message_id: recieved_msg._id
                    }))
                })
                //queryClient.invalidateQueries(['mydialogs'])
            }
        }

    }, [messages])

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
                        dispatch({ type: "MARK_AS_SENT", payload: { mid: message_data.random_id, db_id: message_data.db_id } })
                        break;
                    case WS_MSG_TYPE.TextMessage:
                        dispatch(
                            {
                                type: "PUSH",
                                payload: { message: formatSocketMessage_To_IMessage(message_data as MessageSocketResponseType) }
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
            return () => ws.close()
        }
    }, [])

    return {
        messages,
        isLoading,
        can_load_more,
        loadMore,
        loading_more,
        socket,
        dispatch,
    }
}


type actionType = {
    type: "SET" | "PUSH" | "MARK_AS_SENT" | "MARK_as_READ",
    payload?: { messages?: IMessage[], message?: IMessage, mid?: number, db_id?: number }

}


function reducer(state: IMessage[], action: actionType): IMessage[] {
    const { type, payload } = action
    switch (type) {
        case 'SET':
            return payload?.messages || []
        case 'PUSH':
            if (payload?.message)
                return [payload?.message, ...state]
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
                    return { ...m, sent: true, _id: payload.db_id as number }
                return m
            })
    }
}