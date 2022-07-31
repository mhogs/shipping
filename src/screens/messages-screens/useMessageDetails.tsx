import { useInfinitFetcher, useRefreshOnFocus } from '../../hooks';
import { MessageResponseType, userType, ws_incomingChatMsgType, WS_MSG_TYPE } from '../../@types';
import moment from 'moment';
import { useAuthentication, useWebSocket } from '../../state';
import { IMessage } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import { WEB_SOCKET_SERVER } from '../../constants';
import { showErrorToast } from '../../helpers';
import { useMutation } from '@tanstack/react-query';
import { GenricServices } from '../../services';

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
  
    
    useRefreshOnFocus(refetch)

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
        if (currentUser) {
            const ws = new WebSocket(`${WEB_SOCKET_SERVER}?token=${currentUser?.access}`);
            ws.onopen = (ev: Event) => {
                setWsocket(ws)
                console.log("connected ........");
                /** mark all not read msgs as read */
                messages.filter(msg => msg.user._id === 2 && !msg.received)
                    .map(recieved_msg => {
                        ws.send(JSON.stringify({
                            msg_type: WS_MSG_TYPE.MessageRead,
                            user_pk: filter.user2?.toString(),
                            message_id: recieved_msg._id
                        }))
                    })
            }

            ws.addEventListener("message", (ev: MessageEvent<any>) => {
                const message_data = JSON.parse(ev.data)
                console.log(message_data);

                if (message_data && message_data.msg_type === WS_MSG_TYPE.MessageIdCreated) {
                    SyncMessages()
                }
            })

            ws.onerror = (ev: Event) => {
                console.log("connected ........");
            }
            ws.onclose = (ev: Event) => {
                console.log("disconnected ........");
            }

            
        }

    }, [])



    return { messages, isLoading, loadMore, loading_more, socket, SyncMessages }
}
