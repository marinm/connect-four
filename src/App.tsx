import "./App.css";
import { CodePage } from "./components/CodePage";
import { GameGrid } from "./components/GameGrid";
import { useRoom } from "./hooks/useRoom";

function App() {
    const room = useRoom();

    if (room === null) {
        return "";
    }

    if (!room.socket.isOnline) {
        return <div className="page">No internet connection</div>;
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                maxWidth: "14rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                overflow: "auto",
            }}
        >
            <CodePage room={room} />
            <GameGrid room={room} />
        </div>
    );

    if (room.socket.readyState === WebSocket.CONNECTING) {
        return <div className="page">Connecting...</div>;
    }

    if (room.socket.readyState === WebSocket.CLOSING) {
        return <div className="page">Closing...</div>;
    }

    if (room.socket.readyState != WebSocket.OPEN) {
        // This should never happen
        return <div className="page">Error</div>;
    }

    if (!room.ready) {
        return <div className="page">Waiting for friend...</div>;
    }
}

export default App;
