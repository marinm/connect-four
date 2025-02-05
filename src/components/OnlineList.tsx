import { useState, useEffect } from "react";
import { ServerConnectionEvent } from "../types/ServerConnectionEvent";
import { ServerConnection } from "../utils/ServerConnection";
import { Player, PlayerStatus } from "../types/Player";
import config from "../config";

export default function OnlineList() {
    const [players] = useState<Player[]>([]);

    const id = window.localStorage.getItem("id");
    const name = window.localStorage.getItem("name");

    useEffect(() => {
        const connection = new ServerConnection({
            url: config.serverURL,
            onOpen: (event: ServerConnectionEvent) => {
                console.log("open");
                event.send({
                    id: id,
                    name: name,
                    status: PlayerStatus.Ready,
                });
            },
            onMessage: (event: ServerConnectionEvent) => {
                console.log(event.value);
            },
        });

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
