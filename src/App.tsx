import "./App.css";
import { CodePage } from "./components/CodePage";
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
        return "No internet connection";
    }

    if (room.socket.readyState === WebSocket.CLOSED) {
        return <CodePage room={room} />;
    }

    if (room.socket.readyState === WebSocket.CONNECTING) {
        return "Connecting...";
    }

    if (room.socket.readyState === WebSocket.CLOSING) {
        return "Closing...";
    }

    if (room.socket.readyState != WebSocket.OPEN) {
        return "Error";
    }

    if (!room.ready) {
        return "Waiting for friend...";
    }

    return "Ready!";

    // return (
    //     <div className="page">
    //         <GameGrid />
    //     </div>
    // );
}

export default App;
