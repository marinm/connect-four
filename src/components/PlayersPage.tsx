import { useState, useEffect } from "react";
import { Player } from "../types/Player";
import PlayerListItem from "./PlayerListItem";
import createPresenceConnection from "../logic/createPresenceConnection";
import { GoToPage } from "../types/GoToPage";

type Props = {
    myself: Player;
    goToPage: GoToPage;
};

export default function PlayersPage(props: Props) {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const connection = createPresenceConnection({
            myself: props.myself,
            onChange(players: Player[]) {
                setPlayers([...players]);
            },
        });

        return () => {
            connection.disconnect();
        };
    }, []);

    const others = players.filter((p) => p.id != props.myself.id);

    return (
        <div className="page">
            <h1 className="inverted">Connect Four</h1>
            <div className="online-list">
                {props.myself.name}{" "}
                <button onClick={() => props.goToPage("name")}>
                    Change Name
                </button>
                <ul>
                    {others.map((p) => (
                        <PlayerListItem
                            key={p.id}
                            player={p}
                            isMyself={p.id === props.myself.id}
                            goToPage={props.goToPage}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
