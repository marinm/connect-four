import { useContext, useState } from "react";
import { RoomContext } from "../contexts/RoomContext";
import { randomName } from "../utils/randomName";
import ConnectPage from "./ConnectPage";
import PlayersPage from "./PlayersPage";

export function Pages() {
    const room = useContext(RoomContext);
    const [name] = useState<string>(randomName());

    if (room === null) {
        return "";
    }

    if (!room.socket.isOnline) {
        return "No internet connection";
    }

    if (room.socket.readyState != WebSocket.OPEN) {
        return <ConnectPage />;
    }

    return <PlayersPage myName={name} players={[]} invite={room.invite} />;
}
