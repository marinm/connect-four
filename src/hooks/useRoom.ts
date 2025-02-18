import {
    EasyWebSocket,
    EasyWebSocketEvent,
    useEasyWebSocket,
} from "./useEasyWebSocket";
import { useEffect, useState } from "react";
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
    const [myself, setMyself] = useState("");

    function invite(player: string) {
        console.log(`invite ${player}`);
    }

    function announceMyself() {
        socket.send({ name: myself });
    }

    function onEvent(event: EasyWebSocketEvent) {
        if (event.name === "open") {
            announceMyself();
        }
    }

    function join() {
        setMyself(randomName());
        socket.listen(onEvent);
        socket.open();
    }

    return {
        socket,
        myself,
        join,
        invite,
    };
}
