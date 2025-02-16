import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";
import ConnectPage from "./ConnectPage";
import PlayersPage from "./PlayersPage";

export function Pages() {
    const room = useContext(RoomContext);

    if (room === null) {
        return "";
    }

    if (!room.socket.isOnline) {
        return "No internet connection";
    }

    if (room.socket.readyState != WebSocket.OPEN) {
        return <ConnectPage />;
    }

    return <PlayersPage myName={room.name} players={[]} invite={room.invite} />;
}
