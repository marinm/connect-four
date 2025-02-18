import {
    EasyWebSocket,
    EasyWebSocketEvent,
    useEasyWebSocket,
} from "./useEasyWebSocket";
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "./useEasyWebSocket";
import { randomDigits } from "../utils/randomDigits";

const SERVER_URL = "https://marinm.net/broadcast";

export type Room = {
    myId: string;
    socket: EasyWebSocket;
    join: (friendId: string) => void;
};

function valid(message: Message) {
    return message != null;
}

function isHelloMessage(event: EasyWebSocketEvent): boolean {
    return (
        event.name === "message" &&
        event.message !== null &&
        typeof event.message === "object" &&
        "id" in event.message &&
        typeof event.message.id === "string" &&
        "type" in event.message &&
        typeof event.message.type === "string" &&
        event.message.type === "hello"
    );
}

export function useRoom(): Room {
    const socket = useEasyWebSocket({ valid });
    const myIdRef = useRef("");
    const friendIdRef = useRef("");
    const [myId, setMyId] = useState("    ");

    useEffect(() => {
        setMyId(randomDigits(4));
    }, []);

    const onEvent = useCallback(
        (event: EasyWebSocketEvent) => {
            if (event.name === "open") {
                socket.send({ id: myIdRef.current, type: "hello" });
                return;
            }
            if (isHelloMessage(event)) {
                const message = event.message;
                console.log(message);
            }
        },
        [socket]
    );

    function join(friendId: string) {
        friendIdRef.current = friendId;
        const channel = myId < friendId ? myId + friendId : friendId + myId;
        const url = `${SERVER_URL}?channel=${channel}`;

        socket.listen(onEvent);
        socket.open(url);
    }

    return {
        myId,
        socket,
        join,
    };
}
