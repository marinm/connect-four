import { useEffect, useState } from "react";
import PresenceConnection from "./logic/PresenceConnection";
import { Player, PlayerStatus } from "./types/Player";
import "./App.css";

function App() {
    const myself: Player = {
        id: "id",
        name: "name",
        status: PlayerStatus.Ready,
    };

    useEffect(() => {
        const presenceConnection = new PresenceConnection({
            myself,
            onChange: (newPlayers: Player[]) => {},
        });
        return () => presenceConnection.disconnect();
    }, []);

    // connection callbacks need access to state inside component
    // connection onopen should happen inside component

    return <div></div>;
}

export default App;
