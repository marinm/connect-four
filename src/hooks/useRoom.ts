import { EasyWebSocket, useEasyWebSocket } from "./useEasyWebSocket";
import { valid } from "../logic/valid";

const SERVER_URL = "https://marinm.net/broadcast?channel=connect-four";

export type Room = {
    socket: EasyWebSocket;
    join: () => void;
    invite: (player: string) => void;
};

export function useRoom(): Room {
    const socket = useEasyWebSocket({ url: SERVER_URL, valid });

    function invite(player: string) {
        console.log(`invite ${player}`);
    }

    function join() {
        socket.open();
    }

    return {
        socket,
        join,
        invite,
    };
}
