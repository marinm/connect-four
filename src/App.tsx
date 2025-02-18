import "./App.css";
import { CodePage } from "./components/CodePage";
import { GameGrid } from "./components/GameGrid";
import { useRoom } from "./hooks/useRoom";

// function invite(name: string) {
//     return `invite ${name}`;
// }

// Check the internet connection
// Check the server connection

function App() {
    const room = useRoom();

    if (room === null) {
        return "";
    }

    if (!room.socket.isOnline) {
        return <div className="page">No internet connection</div>;
    }

    if (room.socket.readyState === WebSocket.CLOSED) {
        return <CodePage room={room} />;
    }

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

    return (
        <div className="page">
            <GameGrid room={room} />
        </div>
    );
}

export default App;
