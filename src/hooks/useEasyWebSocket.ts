import { useRef } from "react";
import { parseJSON } from "../utils/parseJSON";

// Some of the benefits of this WebSocket wrapper:
//   - null-safe: the wrapper is never null
//   - lazy: can create without connecting
//   - type-safe: send() enforces valid Message type
//   - validation: the message listener always receives a valid message
//   - order safety: each method checks current state before running

export type EasyWebSocketEvent<Message> = {
    name: "open" | "message" | "close";
    message: null | Message;
};

type EventListener<Message> =
    | (() => void)
    | ((event: EasyWebSocketEvent<Message>) => void);

export type EasyWebSocket<Message> = {
    url: string;
    readyState: null | number;
    open: () => void;
    send: (message: Message) => void;
    close: () => void;
    listen: (callback: EventListener<Message>) => void;
};

type Options<Message> = {
    url: string;
    isMessageType: (message: unknown) => message is Message;
};

export function useEasyWebSocket<Message>(
    options: Options<Message>
): EasyWebSocket<Message> {
    const websocketRef = useRef<null | WebSocket>(null);
    let shouldClose: boolean = false;
    let onEvent: EventListener<Message> = () => {};

    function reasonError(method: string, reason: string) {
        console.error(`ignoring ${method}() because ${reason}`);
    }

    function emit(event: EasyWebSocketEvent<Message>) {
        console.log(event);
        onEvent(event);
    }

    function open() {
        if (websocketRef.current !== null) {
            reasonError("open", "already open");
            return;
        }
        websocketRef.current = new WebSocket(options.url);
        shouldClose = false;

        const websocket = websocketRef.current;

        websocket.onopen = () => {
            console.log("✅ Connected");
            if (shouldClose) {
                websocket.close();
                return;
            }
            emit({
                name: "open",
                message: null,
            });
        };

        websocket.onmessage = (event) => {
            const message = parseJSON(event.data);
            // Valid JSON can be parsed into any of these types:
            //   - Object
            //   - Array
            //   - string
            //   - number
            //   - boolean
            //   - null
            // Allow everything except null.
            if (message === null || !options.isMessageType(message)) {
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
            console.log("❌ Disconnected");
            emit({
                name: "close",
                message: null,
            });
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

        if (websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.close();
        } else {
            shouldClose = true;
        }
    }

    function listen(callback: EventListener<Message>) {
        onEvent = callback;
    }

    return {
        url: options.url,
        readyState: websocketRef.current?.readyState ?? null,
        open,
        send,
        close,
        listen,
    };
}
