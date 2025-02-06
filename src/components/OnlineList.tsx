import { useState, useEffect } from "react";
import { ServerConnection } from "../utils/ServerConnection";
import { Player } from "../types/Player";
import { GameMessageType } from "../types/GameMessageType";
import config from "../config";

function createConnection(myself: Player) {
    const connection = new ServerConnection<GameMessageType>({
        url: config.serverURL,
        onOpen: (event) => {
            event.send(myself);
        },
        onMessage: (event) => {
            const message = event.value;
            if (!message) {
                return;
            }
            if (message.id === myself.id) {
                return;
            }
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
