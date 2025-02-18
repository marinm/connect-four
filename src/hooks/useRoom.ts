import {
    EasyWebSocket,
    EasyWebSocketEvent,
    useEasyWebSocket,
} from "./useEasyWebSocket";
import { useCallback, useRef } from "react";
import { randomName } from "../utils/randomName";
import { Message } from "./useEasyWebSocket";

const SERVER_URL = "https://marinm.net/broadcast";

export type Room = {
    socket: EasyWebSocket;
    myself: string;
    join: (code: string) => void;
};

function valid(message: Message) {
    return "name" in message && typeof message.name === "string";
}

export function useRoom(): Room {
    const socket = useEasyWebSocket({ valid });
    const myselfRef = useRef("");
    const everyoneRef = useRef<string[]>([]);

    const onEvent = useCallback(
        (event: EasyWebSocketEvent) => {
            if (event.name === "open") {
                // Announce myself
                socket.send({ name: myselfRef.current });
            }
            if (
                event.name === "message" &&
                event.message !== null &&
                "name" in event.message &&
                typeof event.message.name === "string"
            ) {
                const name = event.message.name;
                // Ignore own message
                if (name === myselfRef.current) {
                    return;
                }
                if (!everyoneRef.current.includes(name)) {
                    everyoneRef.current.push(name);
                    console.log(
                        "name list updated:",
                        everyoneRef.current.join(",")
                    );
                }
            }
        },
        [socket]
    );

    function join(code: string) {
        myselfRef.current = randomName();
        socket.listen(onEvent);
        const url = `${SERVER_URL}?channel=${code}`;
        socket.open(url);
    }

    return {
        socket,
        myself: myselfRef.current,
        join,
    };
}
