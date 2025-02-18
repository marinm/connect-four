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
        console.log(`select: turn ${game.turn} col ${position.j}`);
        // If it's not my turn, do nothing
        if (game.turn != room.playingAs) {
            console.log("not my turn");
            return;
        }
        room.drop(position.j);
    }

    useEffect(() => {
        room.onDropEvent((event: RoomDropEvent) => {
            console.log(`drop event: turn ${game.turn} col ${event.col}`);

            // Is it this player's turn?
            const friendPlayingAs = room.playingAs === 0 ? 1 : 0;
            const playerTurn =
                event.id === room.myId ? room.playingAs : friendPlayingAs;

            // This shouldn't happen, but check anyways
            if (playerTurn !== game.turn) {
                console.log("out of turn message");
                return;
            }
            game.drop(playerTurn, event.col);
        });
    }, [room, game]);

    const myTurn = game.turn === room.playingAs;

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
            {myTurn ? "My turn" : "Friend's turn"}
        </div>
    );
}
