import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useFetcher, useInfinitFetcher, useRefreshOnFocus } from '../../hooks';
import { dialogResponseType, MessageResponseType, userType, WS_MSG_TYPE } from '../../@types';
import moment from 'moment';
import { showErrorToast, showsuccessToast } from '../../helpers';
import { WEB_SOCKET_SERVER } from '../../constants';
import { useAuthentication } from '../../state';

const API_PAGESIZE = 10



export type dialogType = {
  picture?: string;
  fullName: string;
  messageText: string;
  time: string;
  unread: boolean;
  sender: userType
}

export const useDialogs = (filter?: any) => {
  const { currentUser } = useAuthentication()
  const {
    results: data,
    isLoading,
    isFetchingNextPage: loading_more,
    fetchNextPage: loadMore,
    refetch,
    resultsCount
  } = useInfinitFetcher<dialogResponseType>("mydialogs", filter, "/chat/dialogs/", API_PAGESIZE)

  useRefreshOnFocus(refetch)
 

  useEffect(() => {
    if (currentUser) {

      const ws = new WebSocket(`${WEB_SOCKET_SERVER}?token=${currentUser?.access}`);
      ws.onopen = (ev: Event) => {
        console.log("connected......");

      }
      ws.onmessage = (ev: MessageEvent<any>) => {
        const message_data = JSON.parse(ev.data)
        console.log(message_data);
        switch (message_data.msg_type as WS_MSG_TYPE) {
          case WS_MSG_TYPE.NewUnreadCount:
            console.log('-----------------------');
            refetch()
            break;
        }
      }

      ws.onerror = (ev: Event) => {
        console.log("connected ........");
      }
      ws.onclose = (ev: Event) => {
        console.log("disconnected ........");
      }
      return () => ws.close()
    }
  }, [])

  const dialogs: dialogType[] | undefined = data?.map(item => ({
    picture: item.other_user.picture,
    fullName: `${item.other_user.first_name} ${item.other_user.last_name}`,
    messageText: item.last_message,
    time: moment.unix(item.created).fromNow(),
    unread: item.unread_count > 0,
    sender: item.other_user
  }))
  dialogs.sort((a, b) => a.unread ? -1 : 1)

  return { dialogs, isLoading, loadMore, loading_more }
}
