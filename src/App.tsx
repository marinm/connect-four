import "./App.css";
import EasyWebSocketControls from "./components/EasyWebSocketControls";
import { randomDigits } from "./utils/randomDigits";

function App() {
    const channel = randomDigits(8);

    const broadcastURL = `https://marinm.net/broadcast?channel=${channel}`;

    return (
        <div>
            <EasyWebSocketControls name="1" url={broadcastURL} />
            <EasyWebSocketControls name="2" url={broadcastURL} />
            <EasyWebSocketControls name="3" url={broadcastURL} />
        </div>
    );
}

export default App;
