import { Message } from "../hooks/useEasyWebSocket";

export function valid(message: Message) {
    return message != null;
}
