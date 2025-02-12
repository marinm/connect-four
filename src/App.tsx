import { useState, useEffect } from "react";
import PlayersPage from "./components/PlayersPage";
import { Player, PlayerStatus } from "./types/Player";
import NamePage from "./components/NamePage";
import ConnectPage from "./components/ConnectPage";
import PlayPage from "./components/PlayPage";
import ErrorPage from "./components/ErrorPage";
import { randomDigits } from "./utils/randomDigits";
import PresenceConnection from "./logic/PresenceConnection";
import "./App.css";

function App() {
    const [id, setId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<string>("loading");
    const [name, setName] = useState<string>("");
    const [players, setPlayers] = useState<Player[]>([]);
    const [presenceConnection, setPresenceConnection] =
        useState<null | PresenceConnection>(null);

    if (loading) {
        const storedName: string = window.localStorage.getItem("name") ?? "";
        setName(storedName);

        const storedId = window.localStorage.getItem("id");
        const randomId = storedId ?? randomDigits(8);
        setId(randomId);
        if (storedId === null) {
            window.localStorage.setItem("id", randomId);
        }

        setLoading(false);

        setPage(storedName ? "players" : "name");
    }

    const myself: Player = {
        id: id,
        name: name,
        status: PlayerStatus.Ready,
    };

    useEffect(() => {
        setPresenceConnection(
            new PresenceConnection({
                myself: myself,
                onChange(players: Player[]) {
                    setPlayers([...players]);
                },
            })
        );

        return () => {
            if (presenceConnection) {
                presenceConnection.disconnect();
            }
        };
    }, []);

    function invite(player: Player): void {
        const newGameChannel = randomDigits(8);
        console.log(
            `invite player ${player.id} (${player.name}) on channel ${newGameChannel}`
        );
    }

    function changeName() {
        setPage("name");
    }

    function saveName(newName: string): void {
        window.localStorage.setItem("name", newName);
        setName(newName);
        myself.name = newName;
        if (presenceConnection) {
            presenceConnection.updateMyself(myself);
        }
        setPage("players");
    }

    // Needs a name, or wants to change name

    // Not yet connected

    // Has a name and is connected

    switch (page) {
        case "loading":
            return "";
        case "players":
            return (
                <PlayersPage
                    myself={myself}
                    players={players}
                    invite={invite}
                    changeName={changeName}
                />
            );
        case "name":
            return <NamePage saveName={saveName} currentName={name ?? ""} />;
        case "connect":
            return <ConnectPage goToPage={setPage} />;
        case "play":
            return <PlayPage goToPage={setPage} />;
    }

    return <ErrorPage goToPage={setPage} />;
}

export default App;
