import "./App.css";
import { SocketControls } from "./components/SocketControls";
import { GameGrid } from "./components/GameGrid";
import { useRoom } from "./hooks/useRoom";
import { useGame } from "./hooks/useGame";
import useRegisterDropEventHandler from "./hooks/useRegisterDropEventHandler";

function App() {
    const room = useRoom();
    const game = useGame();

    useRegisterDropEventHandler({ room, game });

    if (!room.socket.isOnline) {
        return <div className="page">No internet connection</div>;
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                overflow: "auto",
            }}
        >
            <SocketControls room={room} />
            <GameGrid room={room} game={game} />
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
