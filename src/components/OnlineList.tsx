import { useState, useEffect } from "react";
import { ServerConnection } from "../utils/ServerConnection";
import { Player } from "../types/Player";
import { GameMessageType } from "../types/GameMessageType";
import config from "../config";

type ConnectionOptions = {
    myself: Player;
    onMessage: (message: GameMessageType) => void;
};

function createConnection(options: ConnectionOptions) {
    const connection = new ServerConnection<GameMessageType>({
        url: config.serverURL,
        onOpen: (event) => {
            event.send(options.myself);
        },
        onMessage: (event) => {
            const message = event.value;
            if (message && message.id !== options.myself.id) {
                options.onMessage(message);
            }
        },
        validateMessage: (message: unknown) => {
            return !!message;
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
        const connection = createConnection({
            myself,
            onMessage: () => {},
        });

        return () => connection.disconnect();
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
