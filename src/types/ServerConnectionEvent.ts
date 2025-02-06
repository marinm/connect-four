export type ServerConnectionEvent<MessageType> = {
    name: string;
    value: undefined | MessageType;
    send: (message: MessageType) => void;
};