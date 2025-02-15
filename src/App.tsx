import "./App.css";
import { Pages } from "./components/Pages";
import { useEasyWebSocket } from "./hooks/useEasyWebSocket";
import { valid } from "./logic/valid";
import { SocketContext } from "./contexts/SocketContext";

const SERVER_URL = "https://marinm.net/broadcast?channel=connect-four";

function App() {
    const socket = useEasyWebSocket({ url: SERVER_URL, valid });
    return (
        <SocketContext.Provider value={socket}>
            <Pages />
        </SocketContext.Provider>
    );
}

export default App;
