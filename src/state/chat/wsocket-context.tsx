import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";
import { LoadingView } from "../../components/util";
import { WEB_SOCKET_SERVER } from "../../constants";
import { useAuthentication } from "../auth";


type WebSocketContextType = WebSocket | null

const WebSocketContext = createContext<WebSocketContextType>(null)

export const WSProvider: FC<{}> = (props) => {
    const [ws, setWs] = useState<WebSocket | null>(null)
    const { currentUser } = useAuthentication()
    useEffect(() => {
        if (currentUser) {
            const ws = new WebSocket(`${WEB_SOCKET_SERVER}?token=${currentUser?.access}`);
            setWs(ws)
        }
        else{
            setWs(null)
        }

        return ()=>ws?.close()

    }, [currentUser])
    const contextValue = useMemo(() => ws, [ws])
    return (
        <WebSocketContext.Provider value={contextValue}>
            {contextValue === null ? <LoadingView /> : props.children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext)