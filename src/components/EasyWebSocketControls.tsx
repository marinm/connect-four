import { useEasyWebSocket, Message } from "../hooks/useEasyWebSocket";

type Options = {
    url: string;
    name: string;
};

function valid(message: Message): boolean {
    return (
        "type" in message &&
        typeof message.type === "string" &&
        ["ping"].includes(message.type)
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
    const socket = useEasyWebSocket({ url: options.url, valid });
    return (
        <div>
            {socket.isOnline ? "online" : "offline"}
            {readyStateLabel(socket.readyState)}
            <button onClick={() => socket.open()}>Open</button>
            <button onClick={() => socket.send({ type: "ping" })}>Ping</button>
            <button onClick={() => socket.close()}>Close</button>
        </div>
    );
}
