import {
    EasyWebSocket,
    EasyWebSocketEvent,
    useEasyWebSocket,
} from "./useEasyWebSocket";
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "./useEasyWebSocket";
import { SERVER_URL, CODE_LENGTH } from "../config.ts";
import { randomDigits } from "../utils/randomDigits";

export type RoomDropEvent = {
    type: "drop";
    id: string;
    col: number;
};

export type RoomDropCallback = (() => void) | ((event: RoomDropEvent) => void);

export type Room = {
    myId: string;
    newId: () => void;
    socket: EasyWebSocket;
    isConnected: boolean;
    join: (friendId: string) => void;
    leave: () => void;
    drop: (col: number) => void;
    onDropEvent: (callback: RoomDropCallback) => void;
    ready: boolean;
    playingAs: null | 0 | 1;
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

type DropMessage = {
    name: "message";
    message: {
        type: "drop";
        id: string;
        col: number;
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

function isDropMessage(event: EasyWebSocketEvent): event is DropMessage {
    return (
        event.name === "message" &&
        event.message !== null &&
        typeof event.message === "object" &&
        "id" in event.message &&
        typeof event.message.id === "string" &&
        "type" in event.message &&
        typeof event.message.type === "string" &&
        event.message.type === "drop"
    );
}

export function useRoom(): Room {
    const socket = useEasyWebSocket({ valid });
    const friendIdRef = useRef("");
    const [myId, setMyId] = useState("    ");
    const [ready, setReady] = useState(false);
    const dropCallbackRef = useRef<RoomDropCallback>(() => {});
    const playingAsRef = useRef<null | 0 | 1>(null);

    function newId() {
        setMyId(randomDigits(CODE_LENGTH));
    }

    useEffect(() => {
        newId();
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
            if (isDropMessage(event)) {
                dropCallbackRef.current(event.message);
                return;
            }
        },
        [socket, myId]
    );

    function join(friendId: string) {
        friendIdRef.current = friendId;
        const channel = myId < friendId ? myId + friendId : friendId + myId;
        const url = `${SERVER_URL}?channel=${channel}`;

        // If myId is lesser, I get the first drop
        // TO DO: handle myId === friendId
        playingAsRef.current = myId < friendId ? 0 : 1;

        socket.listen(onEvent);
        socket.open(url);
    }

    function leave() {
        socket.close();
    }

    function drop(col: number) {
        socket.send({
            type: "drop",
            id: myId,
            col: col,
        });
    }

    function onDropEvent(callback: (event: RoomDropEvent) => void) {
        dropCallbackRef.current = callback;
    }

    const isConnected = socket.readyState === WebSocket.OPEN;

    return {
        myId,
        newId,
        socket,
        isConnected,
        join,
        leave,
        ready,
        drop,
        onDropEvent,
        playingAs: playingAsRef.current,
    };
}
