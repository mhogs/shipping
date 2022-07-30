import { userType } from "./auth"

export type MessageResponseType = {
    id: number,
    text: string,
    created: number,
    modified: number,
    read: boolean,
    file: string|null,
    sender: userType,
    recipient: userType,
    out: boolean,
    sender_username: string
}

export type dialogResponseType={
        "id": number,
        "created": 1659118517,
        "modified": 1659118517,
        "other_user": userType,
        "last_message": string,
        "unread_count": number
}

export enum SW_MSG_TYPE {
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
  