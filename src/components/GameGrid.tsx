import { useGame } from "../hooks/useGame";
import GridSlot from "./GridSlot";

export function GameGrid() {
    const game = useGame();

    return (
        <div className="page">
            <div className="game-grid">
                {game.grid.map((value, index) => {
                    const position = game.positionAt(index);
                    return (
                        <GridSlot
                            key={index}
                            value={value}
                            select={() => game.drop(position.j)}
                            connected={game.four.includes(position)}
                        />
                    );
                })}
            </div>
            Turn: {game.turn}
        </div>
    );
}
