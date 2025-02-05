import { ServerConnectionEvent } from "../types/ServerConnectionEvent";
import { parseJSON } from "./parseJSON";

type ServerConnectionOptions = {
	url: string,
    onOpen: (event: ServerConnectionEvent) => void;
    onMessage: (event: ServerConnectionEvent) => void;
};

export class ServerConnection {
    socket: WebSocket;
    shouldClose: boolean;
    onOpen: (event: ServerConnectionEvent) => void = () => {};
    onMessage: (event: ServerConnectionEvent) => void = () => {};

    constructor({ url, onOpen, onMessage }: ServerConnectionOptions) {
        this.socket = new WebSocket(url);
        this.shouldClose = false;
        this.onOpen = onOpen;
        this.onMessage = onMessage;

        this.socket.onopen = () => {
            console.log("✅ Connected");
            if (this.shouldClose) {
                this.socket.close();
                return;
            }
            this.onOpen({
                name: "open",
                value: undefined,
                send: (message: Object) => this.send(message),
            });
        };

        this.socket.onmessage = (event) => {
            const message = parseJSON(event.data);
            if (!message) {
                return;
            }
            this.onMessage({
                name: "message",
                value: message,
                send: (message: Object) => this.send(message),
            });
        };

        this.socket.onclose = () => {
            console.log("❌ Disconnected");
        };
    }

    disconnect() {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
        } else {
            this.shouldClose = true;
        }
    }

    send(message: Object): void {
        this.socket.send(JSON.stringify(message));
    }
};