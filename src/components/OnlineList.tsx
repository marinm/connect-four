import { useState, useEffect } from "react";
import { Player } from "../types/Player";
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
        const connection = createPresenceConnection({
            myself,
            onChange(players: Player[]) {
                setPlayers([...players]);
            }
        });

        return () => {
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
