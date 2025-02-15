import { useEffect, useRef, useState } from "react";
import { parseJSON } from "../utils/parseJSON";

// Some of the benefits of this WebSocket wrapper:
//   - null-safe: the wrapper is never null
//   - lazy: can create without connecting
//   - type-safe: send() enforces valid Message type
//   - validation: the message listener always receives a valid message
//   - order safety: each method checks current state before running

// Valid JSON can be parsed into any of these types:
//   - Object
//   - Array
//   - string
//   - number
//   - boolean
//   - null
// Allow only non-null objects.
export type Message = NonNullable<object>;

function isMessage(message: unknown): message is Message {
    return message !== null && typeof message === "object";
}

export type EasyWebSocketEvent = {
    name: "open" | "message" | "close";
    message: null | Message;
};

type EventListener = (() => void) | ((event: EasyWebSocketEvent) => void);

export type EasyWebSocket = {
    url: string;
    isOnline: boolean;
    readyState: null | number;
    open: () => void;
    send: (message: Message) => void;
    close: () => void;
    listen: (callback: EventListener) => void;
};

type Options = {
    url: string;
    valid: (message: Message) => boolean;
};

export function useEasyWebSocket(options: Options): EasyWebSocket {
    const websocketRef = useRef<null | WebSocket>(null);
    const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);
    const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine);
    let onEvent: EventListener = () => {};

    useEffect(() => {
        console.log("add online listener");
        const onOnline = () => {
            console.log("✅ online");
            setIsOnline(true);
        };
        const onOffline = () => {
            console.log("❌ offline");
            setIsOnline(false);
        };

        window.addEventListener("online", onOnline);
        window.addEventListener("offline", onOffline);

        return () => {
            console.log("remove online listener");
            window.removeEventListener("online", onOnline);
            window.removeEventListener("offline", onOffline);
        };
    }, []);

    function reasonError(method: string, reason: string) {
        console.log(`ignoring ${method}() because ${reason}`);
    }

    function emit(event: EasyWebSocketEvent) {
        console.log("EasyWebSocketEvent", event);
        onEvent(event);
    }

    function open() {
        if (websocketRef.current !== null) {
            reasonError("open", "already open");
            return;
        }
        websocketRef.current = new WebSocket(options.url);

        const websocket = websocketRef.current;

        websocket.onopen = () => {
            setReadyState(websocket.readyState);
            console.log("✅ Connected");
            emit({
                name: "open",
                message: null,
            });
        };

        websocket.onmessage = (event) => {
            const message = parseJSON(event.data);
            if (!(isMessage(message) && options.valid(message))) {
                console.log("🚫 invalid message received");
                return;
            }
            console.log("✉️ valid message received");
            emit({
                name: "message",
                message: message,
            });
        };

        websocket.onclose = () => {
            setReadyState(websocket.readyState);
            console.log("❌ Disconnected");
            emit({
                name: "close",
                message: null,
            });
            websocketRef.current = null;
        };

        websocket.onerror = console.error;
    }

    function send(message: Message): void {
        if (websocketRef.current === null) {
            if (websocketRef.current === null) {
                reasonError("send", "closed");
                return;
            }
            return;
        }

        if (websocketRef.current.readyState != WebSocket.OPEN) {
            return;
        }
        websocketRef.current.send(JSON.stringify(message));
    }

    function close() {
        if (websocketRef.current === null) {
            reasonError("close", "already closed");
            return;
        }

        if (
            websocketRef.current.readyState === WebSocket.CLOSING ||
            websocketRef.current.readyState === WebSocket.CLOSED
        ) {
            reasonError("close", "already closed");
            return;
        }

        if (websocketRef.current.readyState === WebSocket.CONNECTING) {
            reasonError("close", "connecting in progress");
            return;
        }

        if (websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.close();
            return;
        }

        reasonError("close", "uncaught readyState");
    }

    function listen(callback: EventListener) {
        onEvent = callback;
    }

    return {
        url: options.url,
        isOnline,
        readyState,
        open,
        send,
        close,
        listen,
    };
}
