import { useContext, useState } from "react";
import { SocketContext } from "../contexts/SocketContext";

export function Pages() {
    const [page] = useState<string>("start");
    const socket = useContext(SocketContext);

    switch (page) {
        case "start":
            return "Starting... url: " + socket?.url;
    }

    return "Error";
}
