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
    ready: boolean;
};

function valid(message: Message) {
    return message != null;
}

type HelloMessage = {
    name: "message";
    message: {
        type: "hello";
        id: string;
    };
};

type ReadyMessage = {
    name: "message";
    message: {
        type: "hello";
        id: string;
    };
};

function isHelloMessage(event: EasyWebSocketEvent): event is HelloMessage {
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

function isReadyMessage(event: EasyWebSocketEvent): event is ReadyMessage {
    return (
        event.name === "message" &&
        event.message !== null &&
        typeof event.message === "object" &&
        "id" in event.message &&
        typeof event.message.id === "string" &&
        "type" in event.message &&
        typeof event.message.type === "string" &&
        event.message.type === "ready"
    );
}

export function useRoom(): Room {
    const socket = useEasyWebSocket({ valid });
    const friendIdRef = useRef("");
    const [myId, setMyId] = useState("    ");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setMyId(randomDigits(4));
    }, []);

    const onEvent = useCallback(
        (event: EasyWebSocketEvent) => {
            // Both players introduce themselves once with a "hello"
            if (event.name === "open") {
                socket.send({ id: myId, type: "hello" });
                return;
            }
            if (event.name === "close") {
                setReady(false);
                return;
            }
            // When I get a "hello" from my friend, I know we are both online.
            // But my friend may not have received my hello if they joined after
            // me, so I reply with a "ready" to let them both that I am already
            // online and that I got their hello. I am ready to play.
            if (isHelloMessage(event)) {
                const message = event.message;
                if (message.id !== myId && message.id === friendIdRef.current) {
                    socket.send({ id: myId, type: "ready" });
                    setReady(true);
                }
                return;
            }
            // When I get a "ready" from my friend, I know they got my hello and
            // that we are both online. I am ready to play.
            if (isReadyMessage(event)) {
                const message = event.message;
                if (message.id !== myId && message.id === friendIdRef.current) {
                    setReady(true);
                }
                return;
            }
        },
        [socket, myId]
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
        ready,
    };
}
