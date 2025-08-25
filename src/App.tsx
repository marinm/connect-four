import "./App.css";
import { SocketControls } from "./components/SocketControls";
import { GameGrid } from "./components/GameGrid";
import { useRoom } from "./hooks/useRoom";
import { useGame } from "./hooks/useGame";
import useRegisterDropEventHandler from "./hooks/useRegisterDropEventHandler";
import StatusText from "./components/StatusText";

function App() {
    const room = useRoom();
    const game = useGame();

    useRegisterDropEventHandler({ room, game });

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
            <StatusText room={room} game={game} />
        </div>
    );
}

export default App;
