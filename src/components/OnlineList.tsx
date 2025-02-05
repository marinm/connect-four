import { useState, useEffect } from "react";
// import { parseJSON } from "../utils/parseJSON";
import { Player, PlayerStatus } from "../types/Player";

const serverURL = "https://marinm.net/broadcast?channel=connect-four-presence";


class ServerConnection {
    socket: WebSocket;
    shouldClose: boolean;

    constructor() {
        this.socket = new WebSocket(serverURL);
        this.shouldClose = false;

        this.socket.onopen = () => {
            console.log("✅ Connected");
            if (this.shouldClose) {
                this.socket.close();
            }
        };

        this.socket.onclose = () => {
            console.log("❌ Disconnected");
        };
    }

    disconnect() {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
        } else {
            this.shouldClose = true;
        }
    }
}

export default function OnlineList() {
    const [players] = useState<Player[]>([]);

    // const id = window.localStorage.getItem("id");
    // const name = window.localStorage.getItem("name");

    useEffect(() => {
        const connection = new ServerConnection();

        return () => {
            connection.disconnect();
        };
    }, []);

    return (
        <div className="online-list">
            {players.length} online
            <ul>
                {players.map((p) => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        </div>
    );
}
