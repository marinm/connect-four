import { useState, useEffect } from "react";
import { ServerConnectionEvent } from "../types/ServerConnectionEvent";
import { ServerConnection } from "../utils/ServerConnection";
import { Player, PlayerStatus } from "../types/Player";
import config from "../config";

function createConnection(myself: Player) {
    const connection = new ServerConnection({
        url: config.serverURL,
        onOpen: (event: ServerConnectionEvent) => {
            console.log("open");
            event.send(myself);
        },
        onMessage: (event: ServerConnectionEvent) => {
            console.log(event.value);
        },
    });
    return connection;
}

type OnlineListOptions = {
    myself: Player;
};

export default function OnlineList({ myself }: OnlineListOptions) {
    const [players] = useState<Player[]>([]);

    useEffect(() => {
        const connection = createConnection(myself);

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
