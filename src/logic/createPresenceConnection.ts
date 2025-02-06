import config from "../config";
import { ServerConnection } from "../utils/ServerConnection";
import { GameMessageType } from "../types/GameMessageType";
import { Player } from "../types/Player";

type ConnectionOptions = {
	myself: Player;
	onMessage: (message: GameMessageType) => void;
};

export default function createPresenceConnection(options: ConnectionOptions) {
	const connection = new ServerConnection<GameMessageType>({
		url: config.serverURL,
		onOpen: (event) => {
			event.send(options.myself);
		},
		onMessage: (event) => {
			const message = event.value;
			if (message && message.id !== options.myself.id) {
				options.onMessage(message);
			}
		},
		validateMessage: (message: unknown) => {
			return !!message;
		},
	});
	return connection;
}
