import {
    EasyWebSocket,
    EasyWebSocketEvent,
    useEasyWebSocket,
} from "./useEasyWebSocket";
import { useState } from "react";
import { randomName } from "../utils/randomName";
import { Message } from "./useEasyWebSocket";

const SERVER_URL = "https://marinm.net/broadcast?channel=connect-four";

export type Room = {
    socket: EasyWebSocket;
    myself: string;
    join: (as: string) => void;
    invite: (player: string) => void;
};

function valid(message: Message) {
    return "name" in message && typeof message.name === "string";
}

export function useRoom(): Room {
    const socket = useEasyWebSocket({ url: SERVER_URL, valid });
    const [myself, setMyself] = useState<string>("");

    function invite(player: string) {
        console.log(`invite ${player}`);
    }

    function announceMyself() {
        console.log("room: announceMyself");
        socket.send({ name: myself });
    }

    function join() {
        socket.listen((event) => {
            console.log(event);
        });

        setMyself(randomName());

        socket.listen((event: EasyWebSocketEvent) => {
            console.log("room: event", event);

            if (event.name === "open") {
                console.log("room: socket open");
                announceMyself();
            }
        });

        socket.open();
    }

    return {
        socket,
        myself,
        join,
        invite,
    };
}
