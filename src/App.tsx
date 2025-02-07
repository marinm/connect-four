import { useState, useEffect } from "react";
import PlayersPage from "./components/PlayersPage";
import { Player, PlayerStatus } from "./types/Player";
import NamePage from "./components/NamePage";
import ConnectPage from "./components/ConnectPage";
import PlayPage from "./components/PlayPage";
import ErrorPage from "./components/ErrorPage";
import { randomDigits } from "./utils/randomDigits";
import createPresenceConnection from "./logic/createPresenceConnection";
import "./App.css";

function App() {
    const [id, setId] = useState<string>("");
    const [page, setPage] = useState<string>("");

    const name: string = window.localStorage.getItem("name") ?? "";

    if (!page.length) {
        setPage(name ? "players" : "name");
    }

    if (!id.length) {
        const storedId = window.localStorage.getItem("id");
        const randomId = storedId ?? randomDigits(8);
        setId(randomId);
        if (storedId === null) {
            window.localStorage.setItem("id", randomId);
        }
    }

    const myself: Player = {
        id: id,
        name: name,
        status: PlayerStatus.Ready,
    };

    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const connection = createPresenceConnection({
            myself: myself,
            onChange(players: Player[]) {
                setPlayers([...players]);
            },
        });

        return () => {
            connection.disconnect();
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

    switch (page) {
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
            return <NamePage goToPage={setPage} currentName={name ?? ""} />;
        case "connect":
            return <ConnectPage goToPage={setPage} />;
        case "play":
            return <PlayPage goToPage={setPage} />;
    }

    return <ErrorPage goToPage={setPage} />;
}

export default App;
