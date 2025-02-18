import {
    EasyWebSocket,
    EasyWebSocketEvent,
    useEasyWebSocket,
} from "./useEasyWebSocket";
import { useCallback, useRef } from "react";
import { randomName } from "../utils/randomName";
import { Message } from "./useEasyWebSocket";

const SERVER_URL = "https://marinm.net/broadcast?channel=connect-four";

export type Room = {
    socket: EasyWebSocket;
    myself: string;
    join: () => void;
    invite: (player: string) => void;
};

function valid(message: Message) {
    return "name" in message && typeof message.name === "string";
}

export function useRoom(): Room {
    const socket = useEasyWebSocket({ url: SERVER_URL, valid });
    const myselfRef = useRef("");

    function invite(player: string) {
        console.log(`invite ${player}`);
    }

    const onEvent = useCallback(
        (event: EasyWebSocketEvent) => {
            if (event.name === "open") {
                socket.send({ name: myselfRef.current });
            }
        },
        [socket]
    );

    function join() {
        myselfRef.current = randomName();
        socket.listen(onEvent);
        socket.open();
    }

    return {
        socket,
        myself: myselfRef.current,
        join,
        invite,
    };
}
