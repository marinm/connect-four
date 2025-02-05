import { useState } from "react";
import { parseJSON } from "../utils/parseJSON";
import { Player, PlayerStatus } from "../types/Player";

const serverURL = "https://marinm.net/broadcast?channel=connect-four-presence";

export default function OnlineList() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);

    const id = window.localStorage.getItem("id");
    const name = window.localStorage.getItem("name");

    if (socket === null) {
        const socket = new WebSocket(serverURL);

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    type: "presence",
                    id: id,
                    name: name,
					status: PlayerStatus.Ready,
                })
            );
        };

        socket.onclose = () => {
            console.log("close");
        };

        socket.onerror = () => {
            console.log("error");
        };

        socket.onmessage = ({ data }) => {
            console.log("message");
            const message = parseJSON(data);
            if (message === null) {
                console.log("invalid message");
                return;
            }
            if (message.id === id) {
                // own message
				console.log('own message');
                return;
            }

			console.log(message);

			if (message.type == "presence") {
				if (players.findIndex((p) => p.id === message.id) === -1) {
					console.log("pushing");
					players.push({
						id: message.id,
						name: message.name,
						status: message.status,
					})
					setPlayers([...players]);
				} else {
					console.log("not pushing");
				}
			}
        };

        setSocket(socket);
    }

    return (
        <div className="online-list">
			{players.length} online
            <ul>
				{players.map(p => <li key={p.id}>{p.name}</li>)}
			</ul>
        </div>
    );
}
