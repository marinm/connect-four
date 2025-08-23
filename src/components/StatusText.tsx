import type { Room } from "../hooks/useRoom";
import type { Game } from "../hooks/useGame";

type Props = {
    room: Room;
    game: Game;
};

function getStatusText(room: Room, game: Game): string {
    if (!room.socket.isOnline) {
        return "No internet connection";
    }
    if (room.socket.readyState != WebSocket.OPEN) {
        return "Enter code to pair";
    }
    if (!room.ready) {
        return "Waiting for opponent...";
    }
    if (!game.on) {
        return game.four.length === 4 ? "Game over!" : "Waiting to start";
    }
    return room.playingAs === game.turn ? "My turn" : "Friend's turn";
}

export default function StatusText({ room, game }: Props) {
    const statusText = getStatusText(room, game);
    return <small>{statusText}</small>;
}
