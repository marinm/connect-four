import config from "../config";
import { ServerConnection } from "../utils/ServerConnection";
import { GameMessageType } from "../types/GameMessageType";
import { Player } from "../types/Player";

type Options = {
    myself: Player;
	onChange: (players: Player[]) => void;
};

export default function createPresenceConnection(options: Options) {
	let presenceInterval: number|null = null;

    const connection = new ServerConnection<GameMessageType>({
        url: config.serverURL,
        onOpen: () => {
            connection.send(options.myself);

			presenceInterval = window.setInterval(() => {
				connection.send(options.myself);
			}, 5000);
        },
        onMessage: (message) => {
            if (message.id !== options.myself.id) {
                // options.onMessage(message);
            }
        },
		onClose: () => {
			if (presenceInterval != null) {
				window.clearInterval(presenceInterval);
			}
		},
        validateMessage: (message: unknown) => {
            return !!message;
        },
    });
    return connection;
}
