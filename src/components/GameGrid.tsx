import { useGame } from "../hooks/useGame";
import GridSlot from "./GridSlot";

export function GameGrid() {
    const game = useGame();

    return (
        <div className="page">
            <div className="game-grid">
                {game.grid.map((slot, index) => (
                    <GridSlot
                        key={index}
                        row={index}
                        col={index}
                        value={slot}
                        select={() => game.drop(index)}
                        connected={game.four.includes()}
                    />
                ))}
            </div>
            Turn: {game.turn}
        </div>
    );
}
