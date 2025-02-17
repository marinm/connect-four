import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";
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
        return (
            <div className="page">
                <button onClick={() => room?.join("my-name")}>Connect</button>
            </div>
        );
    }

    return (
        <PlayersPage myself={room.myself} players={[]} invite={room.invite} />
    );
}
