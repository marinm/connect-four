import { createContext } from "react";
import { Room } from "../hooks/useRoom";

export const RoomContext = createContext<null | Room>(null);
