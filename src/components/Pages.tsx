import { useContext, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";
import NamePage from "./NamePage";

export function Pages() {
    const socket = useContext(SocketContext);
    const [name, setName] = useState<string>("");

    if (socket === null) {
        return "";
    }

    if (!socket.isOnline) {
        return "No internet connection";
    }

    if (!name) {
        return <NamePage currentName={name} setName={setName} />;
    }

    return "Playing as " + name;
}
