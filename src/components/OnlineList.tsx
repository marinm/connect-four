import { useState, useEffect } from "react";
import { Player } from "../types/Player";
import PlayerList from "../logic/PlayerList";
import PlayerListItem from "./PlayerListItem";
import createPresenceConnection from "../logic/createPresenceConnection";
import { GoToPage } from "../types/GoToPage";

type OnlineListOptions = {
    myself: Player;
    goToPage: GoToPage;
};

export default function OnlineList({ myself, goToPage }: OnlineListOptions) {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const playerList = new PlayerList(players);

        playerList.push(myself);

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
            ONLINE ({players.length})
            <ul>
                {players.map((p) => (
                    <PlayerListItem
                        key={p.id}
                        player={p}
                        isMyself={p.id === myself.id}
                        goToPage={goToPage}
                    />
                ))}
            </ul>
        </div>
    );
}
