import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useFetcher, useInfinitFetcher, useRefreshOnFocus } from '../../hooks';
import { dialogResponseType, MessageResponseType, SW_MSG_TYPE, userType } from '../../@types';
import moment from 'moment';
import { showErrorToast, showsuccessToast } from '../../helpers';
import { WEB_SOCKET_SERVER } from '../../constants';
import { useAuthentication } from '../../state';
import { IMessage } from 'react-native-gifted-chat';

const API_PAGESIZE = 20

export type dialogType = {
    picture?: string;
    fullName: string;
    messageText: string;
    time: string;
    unread: boolean;
    sender: userType
}


export const useMessageDetails = (filter: { user2?: number }) => {
    const { currentUser } = useAuthentication()


    function getsenderSide(sender_id?: number) {
        // 1 for right , 2 for left
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
    useRefreshOnFocus(refetch)

    const messages: IMessage[] | undefined = data?.map(msg => ({
        _id: msg.id,
        text: msg.text,
        createdAt: moment.unix(msg.created).toDate(),
        user: {
            _id: getsenderSide(msg.sender.id),
            name: msg.sender_username,
            avatar: msg.sender.picture,
        },
        image: msg.file,
        received: msg.read
    } as IMessage))

    useEffect(() => {
        if (currentUser && messages?.length) {
            const ws = new WebSocket(`${WEB_SOCKET_SERVER}?token=${currentUser?.access}`);

            ws.onopen = (ev: Event) => {
                console.log("connected ........");
                /** mark all not read msgs as read */
                messages.
                    filter(msg => msg.user._id === 2 && !msg.received)
                    .map(recieved_msg => {
                        ws.send(JSON.stringify({
                            msg_type: SW_MSG_TYPE.MessageRead,
                            user_pk: filter.user2?.toString(),
                            message_id: recieved_msg._id
                        }))
                    })

            }

            ws.onmessage = (ev: MessageEvent<any>) => {
                console.log({ data: ev.data });
                console.log({ type: ev.type });
                showsuccessToast("event in ")
            }
            ws.onerror = (ev: Event) => {
                console.log("connected ........");
            }
            ws.onclose = (ev: Event) => {
                showErrorToast("disconnected", "connection clodes")
            }

            return () => {
                ws.close()
            }
        }

    }, [data])

    return { messages, isLoading, loadMore, loading_more }
}
