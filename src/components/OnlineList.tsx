import { useState, useEffect } from "react";
import { Player } from "../types/Player";
import PlayerList from "../logic/PlayerList";
import createPresenceConnection from "../logic/createPresenceConnection";

type OnlineListOptions = {
    myself: Player;
};

export default function OnlineList({ myself }: OnlineListOptions) {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const playerList = new PlayerList(players);

        const connection = createPresenceConnection({
            myself,
            onMessage: (message) => {
                playerList.push(message);
                setPlayers([...playerList.all()]);
            },
        });

        const presenceInterval = setInterval(() => {
            connection.send(myself);
        }, 5000);

        return () => {
            clearInterval(presenceInterval);
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
