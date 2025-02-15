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

export default function EasyWebSocketControls(options: Options) {
    const socket = useEasyWebSocket({ url: options.url, valid });
    return (
        <div>
            EasyWebSocketControls {options.name}
            <button onClick={() => socket.open()}>Open</button>
            <button onClick={() => socket.send({ type: "ping" })}>Ping</button>
            <button onClick={() => socket.close()}>Close</button>
        </div>
    );
}
