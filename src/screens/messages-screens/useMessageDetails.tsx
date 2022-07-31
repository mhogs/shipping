import { useInfinitFetcher, useRefreshOnFocus } from '../../hooks';
import { MessageResponseType, userType, ws_incomingChatMsgType, WS_MSG_TYPE } from '../../@types';
import moment from 'moment';
import { useAuthentication } from '../../state';
import { IMessage } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import { WEB_SOCKET_SERVER } from '../../constants';

import { useQueryClient } from '@tanstack/react-query';


//queryClient.invalidateQueries(['mydialogs'])

const API_PAGESIZE = 10

export type dialogType = {
    picture?: string;
    fullName: string;
    messageText: string;
    time: string;
    unread: boolean;
    sender: userType
}


export const useMessageDetails = (filter: { user2: number }) => {
    const { currentUser } = useAuthentication()
    const [socket, setWsocket] = useState<WebSocket | null>(null)
    const queryClient = useQueryClient()

    // return 1 for right , 2 for left
    function getsenderSide(sender_id?: number) {
        return currentUser?.id === sender_id ? 1 : 2
    }

    const {
        results: data,
        isLoading,
        isFetchingNextPage: loading_more,
        fetchNextPage: loadMore,
        refetch,
        resultsCount
    } = useInfinitFetcher<MessageResponseType>("messages", filter, "/chat/messages/", API_PAGESIZE)

    async function SyncMessages() {
        refetch({ refetchPage: (page, index) => index === 0 })
    }



    const messages = data.map(msg => (
        {
            _id: msg.id,
            text: msg.text,
            createdAt: moment.unix(msg.created).toDate(),
            user: {
                _id: getsenderSide(msg.sender.id),
                name: msg.sender_username,
                avatar: msg.sender.picture
            },
            received: msg.read
        }
    ) as IMessage)

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
                queryClient.invalidateQueries(['mydialogs'])
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
                        SyncMessages()
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



    return { messages, isLoading, loadMore, loading_more, socket, SyncMessages,API_PAGESIZE }
}
