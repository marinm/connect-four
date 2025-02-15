import { useContext, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { randomName } from "../utils/randomName";
import ConnectPage from "./ConnectPage";

export function Pages() {
    const socket = useContext(SocketContext);
    const [name] = useState<string>(randomName());

    if (socket === null) {
        return "";
    }

    if (!socket.isOnline) {
        return "No internet connection";
    }

    if (socket.readyState != WebSocket.OPEN) {
        return <ConnectPage />;
    }

    console.log("online as " + name);

    return "Playing as " + name;
}
