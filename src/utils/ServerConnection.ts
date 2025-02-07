import { parseJSON } from "./parseJSON";

type Options<Message> = {
    url: string;
    onOpen: () => void;
    onMessage: (message: Message) => void;
    onClose: () => void;
    validateMessage: (message: unknown) => boolean;
};

export class ServerConnection<Message> {
    socket: WebSocket;
    shouldClose: boolean;
    onOpen: () => void = () => {};
    onMessage: (message: Message) => void = () => {};
    onClose: () => void = () => {};
    validateMessage: (message: unknown) => boolean;

    constructor(options: Options<Message>) {
        this.socket = new WebSocket(options.url);
        this.shouldClose = false;
        this.onOpen = options.onOpen;
        this.onMessage = options.onMessage;
        this.onClose = this.onClose;
        this.validateMessage = options.validateMessage;

        this.socket.onopen = () => {
            console.log("✅ Connected");
            if (this.shouldClose) {
                this.socket.close();
                return;
            }
            this.onOpen();
        };

        this.socket.onmessage = (event) => {
            const message = parseJSON(event.data);
            if (message === null || !this.isMessageType(message)) {
                return;
            }
            this.onMessage(message);
        };

        this.socket.onclose = () => {
            console.log("❌ Disconnected");
            this.onClose();
        };
    }

    isMessageType(message: unknown): message is Message {
        return this.validateMessage(message);
    }

    disconnect() {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
        } else {
            this.shouldClose = true;
        }
    }

    send(message: Message): void {
        if (this.socket.readyState != WebSocket.OPEN) {
            return;
        }
        this.socket.send(JSON.stringify(message));
    }
}
