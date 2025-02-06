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

class PlayerList {
    players: Player[] = [];

    constructor(players: Player[]) {
        this.players = players;
    }

    all() {
        return [...this.players];
    }

    findIndex(player: Player) {
        return this.players.findIndex((p) => p.id === player.id);
    }

    push(player: Player) {
        const index = this.findIndex(player);
        if (index === -1) {
            this.players.push(player);
        }
    }
}

type OnlineListOptions = {
    myself: Player;
};

export default function OnlineList({ myself }: OnlineListOptions) {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const playerList = new PlayerList(players);

        const connection = createConnection({
            myself,
            onMessage: (message) => {
                playerList.push(message);
                setPlayers([...playerList.all()])
            },
        });

        const presenceInterval = setInterval(() => {
            connection.send(myself);
        }, 5000);

        return () => {
            clearInterval(presenceInterval);
            connection.disconnect();
        }
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
