import { ServerConnectionEvent } from "../types/ServerConnectionEvent";
import { parseJSON } from "./parseJSON";

type ServerConnectionOptions<Message> = {
	url: string,
    onOpen: (event: ServerConnectionEvent<Message>) => void;
    onMessage: (event: ServerConnectionEvent<Message>) => void;
    validateMessage: (message: unknown) => boolean;
};

export class ServerConnection<Message> {
    socket: WebSocket;
    shouldClose: boolean;
    onOpen: (event: ServerConnectionEvent<Message>) => void = () => {};
    onMessage: (event: ServerConnectionEvent<Message>) => void = () => {};
    validateMessage: (message: unknown) => boolean;

    constructor({ url, onOpen, onMessage, validateMessage }: ServerConnectionOptions<Message>) {
        this.socket = new WebSocket(url);
        this.shouldClose = false;
        this.onOpen = onOpen;
        this.onMessage = onMessage;
        this.validateMessage = validateMessage;

        this.socket.onopen = () => {
            console.log("✅ Connected");
            if (this.shouldClose) {
                this.socket.close();
                return;
            }
            this.onOpen({
                name: "open",
                value: undefined,
                send: (message: Message) => this.send(message),
            });
        };

        this.socket.onmessage = (event) => {
            const message = parseJSON(event.data);
            if (!this.isMessageType(message)) {
                return;
            }
            this.onMessage({
                name: "message",
                value: message,
                send: (message: Message) => this.send(message),
            });
        };

        this.socket.onclose = () => {
            console.log("❌ Disconnected");
        };
    }

    isMessageType(message: unknown): message is Message {
        return true
    }

    disconnect() {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
        } else {
            this.shouldClose = true;
        }
    }

    send(message: Message): void {
        this.socket.send(JSON.stringify(message));
    }
};