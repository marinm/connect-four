import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";

function invite(name: string) {
    console.log(`invite ${name}`);
}

export function Pages() {
    const room = useContext(RoomContext);
    const myself = "my-name";
    const players: string[] = [];

    if (room === null) {
        return "";
    }

    if (!room.socket.isOnline) {
        return "No internet connection";
    }

    if (room.socket.readyState != WebSocket.OPEN) {
        return (
            <div className="page">
                <button onClick={() => room?.join(myself)}>Connect</button>
            </div>
        );
    }

    return (
        <div className="page">
            <h1 className="inverted">Connect Four</h1>
            <div className="online-list">
                {myself} (myself)
                <ul>
                    {players.map((player) => (
                        <li onClick={() => invite(player)} key={player}>
                            <div>{player}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
