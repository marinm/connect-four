import { useState } from "react";
import { useEasyWebSocket, Message } from "../hooks/useEasyWebSocket";

type Options = {
    url: string;
    name: string;
};

function valid(message: Message): boolean {
    return (
        "type" in message &&
        typeof message.type === "string" &&
        ["ping"].includes(message.type) &&
        "name" in message &&
        typeof message.name === "string"
    );
}

function readyStateLabel(readyState: null | number): string {
    switch (readyState) {
        case WebSocket.CLOSED:
            return "CLOSED";
        case WebSocket.CLOSING:
            return "CLOSING";
        case WebSocket.CONNECTING:
            return "CONNECTING";
        case WebSocket.OPEN:
            return "OPEN";
    }
    return "UNKNOWN";
}

export default function EasyWebSocketControls(options: Options) {
    const [recentFrom, setRecentFrom] = useState<string>("");
    const socket = useEasyWebSocket({ url: options.url, valid });

    socket.listen((event) => {
        console.log("heard event", event);
        if (
            event.name === "message" &&
            event.message &&
            "name" in event.message
        ) {
            setRecentFrom(String(event.message.name));
        }
    });

    return (
        <div
            style={{
                display: "grid",
                gap: "2ch",
                alignItems: "center",
                gridTemplateColumns: "repeat(5, 1fr)",
            }}
        >
            <div>{socket.isOnline ? "online" : "offline"}</div>
            <div>{readyStateLabel(socket.readyState)}</div>
            <button
                onClick={() => socket.open()}
                disabled={socket.readyState != WebSocket.CLOSED}
            >
                Open
            </button>
            <button
                onClick={() =>
                    socket.send({ type: "ping", name: options.name })
                }
                disabled={socket.readyState != WebSocket.OPEN}
            >
                Ping
            </button>
            <button
                onClick={() => socket.close()}
                disabled={socket.readyState != WebSocket.OPEN}
            >
                Close
            </button>
            <div>{recentFrom}</div>
        </div>
    );
}
