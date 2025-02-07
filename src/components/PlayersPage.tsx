import { Player } from "../types/Player";

type Props = {
    myself: Player;
    players: Player[];
    invite: (player: Player) => void;
    changeName: () => void;
};

export default function PlayersPage(props: Props) {
    const others = props.players.filter((p) => p.id != props.myself.id);

    return (
        <div className="page">
            <h1 className="inverted">Connect Four</h1>
            <div className="online-list">
                {props.myself.name}{" "}
                <button onClick={() => props.changeName()}>Change Name</button>
                <ul>
                    {others.map((player) => (
                        <li
                            onClick={() => props.invite(player)}
                            key={player.id}
                        >
                            <div>{player.name}</div>
                            <div>{player.status}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
