import { createContext } from "react";
import { EasyWebSocket } from "../hooks/useEasyWebSocket";

export const SocketContext = createContext<null | EasyWebSocket>(null);
