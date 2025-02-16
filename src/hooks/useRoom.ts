import { EasyWebSocket, useEasyWebSocket } from "./useEasyWebSocket";
import { useState } from "react";
import { valid } from "../logic/valid";
import { randomName } from "../utils/randomName";

const SERVER_URL = "https://marinm.net/broadcast?channel=connect-four";

export type Room = {
    socket: EasyWebSocket;
    name: string;
    join: (as: string) => void;
    invite: (player: string) => void;
};

export function useRoom(): Room {
    const socket = useEasyWebSocket({ url: SERVER_URL, valid });
    const [name, setName] = useState<string>("");

    function invite(player: string) {
        console.log(`invite ${player}`);
    }

    function announceMyself() {
        socket.send({});
    }

    function join() {
        socket.listen((event) => {
            console.log(event);
        });

        setName(randomName());

        socket.open();
        announceMyself();
    }

    return {
        socket,
        name,
        join,
        invite,
    };
}
