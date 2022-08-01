import { userType } from './auth'

export type MessageResponseType = {
    id: number,
    text: string,
    created: number,
    modified: number,
    read: boolean,
    file: string | null,
    sender: userType,
    recipient: userType,
    out: boolean,
    sender_username: string
}
export type MessageSocketResponseType=
{
    msg_type: WS_MSG_TYPE.TextMessage
    random_id: number
    text: string
    sender: string
    receiver: string
    sender_username: string
}

export type dialogResponseType = {
    id: number,
    created: 1659118517,
    modified: 1659118517,
    other_user: userType,
    last_message: string,
    unread_count: number
}

export enum WS_MSG_TYPE {
    WentOnline = 1,
    WentOffline = 2,
    TextMessage = 3,
    FileMessage = 4,
    IsTyping = 5,
    MessageRead = 6,
    ErrorOccurred = 7,
    MessageIdCreated = 8,
    NewUnreadCount = 9,
    TypingStopped = 10
}
export type MessageApiQueryParamType={
    user2:number,
    offset?:number,
    limit?:number
}

export type ws_incomingChatMsgType = {
    msg_type: WS_MSG_TYPE
    random_id: number
    text: string
    sender: string
    receiver: string
    sender_username: string
}

export type dialogType = {
    picture?: string;
    fullName: string;
    messageText: string;
    time: string;
    unread: boolean;
    sender: userType
  }