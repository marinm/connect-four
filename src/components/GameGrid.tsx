import { Game } from "../hooks/useGame";
import { Room } from "../hooks/useRoom";
import GridSlot from "./GridSlot";
import { Position } from "../types/Position";

type Props = {
    room: Room;
    game: Game;
};

export function GameGrid({ room, game }: Props) {
    // const myTurn = game.turn === room.playingAs;

    // On tap/click, just emit the intent. I will update my visual board only
    // when receiving the echo of this intent in the onDropEvent() handler.
    function select(position: Position) {
        console.log(`select: turn ${game.turn} col ${position.j}`);
        // If it's not my turn, do nothing
        if (game.turn != room.playingAs) {
            console.log("not my turn");
            return;
        }
        room.drop(position.j);
    }

    const disabled = !room.ready;

    return (
        <div
            style={{
                backgroundColor: "#fefaf0",
                border: "0.2ch solid #f2c673",
                outline: "0.2ch solid #6c421e",
                boxSizing: "border-box",
                padding: "0.5ch",
                borderRadius: "1ch",
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "0.5ch",
                width: "98%",
                opacity: disabled ? "0.5" : "",
            }}
        >
            {game.grid.map((value, index) => {
                const position = game.positionAt(index);
                return (
                    <GridSlot
                        key={index}
                        value={value}
                        select={() => select(position)}
                        connected={game.four.includes(position)}
                    />
                );
            })}
        </div>
    );
}
