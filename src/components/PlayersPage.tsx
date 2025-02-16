type Props = {
    myName: string;
    players: string[];
    invite: (player: string) => void;
};

export default function PlayersPage(props: Props) {
    return (
        <div className="page">
            <h1 className="inverted">Connect Four</h1>
            <div className="online-list">
                {props.myName} (myself)
                <ul>
                    {props.players.map((player) => (
                        <li onClick={() => props.invite(player)} key={player}>
                            <div>{player}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
