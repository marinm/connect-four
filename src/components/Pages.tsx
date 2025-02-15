import { useContext, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { randomName } from "../utils/randomName";

export function Pages() {
    const socket = useContext(SocketContext);
    const [name] = useState<string>(randomName());

    if (socket === null) {
        return "";
    }

    if (!socket.isOnline) {
        return "No internet connection";
    }

    console.log("online as " + name);

    return "Playing as " + name;
}
