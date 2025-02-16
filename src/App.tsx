import "./App.css";
import { Pages } from "./components/Pages";
import { RoomContext } from "./contexts/RoomContext";
import { useRoom } from "./hooks/useRoom";

function App() {
    const room = useRoom();
    return (
        <RoomContext.Provider value={room}>
            <Pages />
        </RoomContext.Provider>
    );
}

export default App;
