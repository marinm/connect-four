import { useEffect } from "react";
import type { Room, RoomDropEvent } from "./useRoom";
import type { Game } from "./useGame";

type Props = {
    room: Room;
    game: Game;
};

export default function ({ room, game }: Props) {
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

        // Before starting the game, check that it has not already started and
        // that it has not already ended
        if (room.ready && !game.on && !game.four.length) {
            game.start();
        }
        if (game.on && !room.ready) {
            game.stop();
        }
    }, [room, game]);
}
