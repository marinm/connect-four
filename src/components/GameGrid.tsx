import { useEffect } from "react";
import { useGame } from "../hooks/useGame";
import { Room, RoomDropEvent } from "../hooks/useRoom";
import GridSlot from "./GridSlot";
import { Position } from "../types/Position";

type Props = {
    room: Room;
};

export function GameGrid({ room }: Props) {
    const game = useGame();

    // On tap/click, just emit the intent. I will update my visual board only
    // when receiving the echo of this intent in the onDropEvent() handler.
    function select(position: Position) {
        room.drop(position.j);
    }

    useEffect(() => {
        room.onDropEvent((event: RoomDropEvent) => {
            game.drop(event.col);
        });
    }, [room, game]);

    return (
        <div className="page">
            <div className="game-grid">
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
            Turn: {game.turn}
        </div>
    );
}
