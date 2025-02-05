export type ServerConnectionEvent = {
    name: string;
    value: undefined | Object;
    send: (message: Object) => void;
};