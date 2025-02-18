import "./App.css";
import { useRoom } from "./hooks/useRoom";

// function invite(name: string) {
//     return `invite ${name}`;
// }

// Check the internet connection
// Check the server connection

function App() {
    const room = useRoom();
    // const players: string[] = [];

    if (room === null) {
        return "";
    }

    if (!room.socket.isOnline) {
        return "No internet connection";
    }

    if (room.socket.readyState === WebSocket.CLOSED) {
        return (
            <div className="page">
                <button onClick={() => room.join()}>Connect</button>
                <div>{room.socket.error ? "There was an error" : ""}</div>
            </div>
        );
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

    return (
        <div>
            <div>Connected!</div>
            <div>Playing as {room.myself}</div>
        </div>
    );

    // return (
    //     <div className="page">
    //         <h1 className="inverted">Connect Four</h1>
    //         <div className="online-list">
    //             {myself} (myself)
    //             <ul>
    //                 {players.map((player) => (
    //                     <li onClick={() => invite(player)} key={player}>
    //                         <div>{player}</div>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     </div>
    // );

    // return (
    //     <div className="page">
    //         <GameGrid />
    //     </div>
    // );
}

export default App;
