import config from "../config";
import { ServerConnection } from "../utils/ServerConnection";
import { Player } from "../types/Player";
import { PresenceMessage } from "../types/GameMessageType";

type Options = {
    myself: Player;
    onChange: (players: Player[]) => void;
};

const MIN_ANNOUNCE_PAUSE = 1000;
const MAX_ANNOUNCE_PAUSE = 5000;

export default function createPresenceConnection(
    options: Options
): ServerConnection<PresenceMessage> {
    let presenceInterval: number | null = null;

    let players: Player[] = [];
    let announcedAt: number = 0;

    function same(current: Player, prev: Player) {
        return current.name === prev.name && current.status === prev.status;
    }

    function push(player: Player) {
        const index = players.findIndex((p) => p.id === player.id);

        // Do nothing if the player hasn't changed
        if (index > -1 && same(player, players[index])) {
            return;
        }

        if (index > -1) {
            players[index] = player;
        } else {
            players.push(player);
        }
        options.onChange(players);
    }

    const connection = new ServerConnection<PresenceMessage>({
        url: config.serverURL,
        onOpen: () => {
            announceMyself();
            push(options.myself);

            presenceInterval = window.setInterval(() => {
                announceMyself();
            }, MAX_ANNOUNCE_PAUSE);
        },
        onMessage: (message: PresenceMessage) => {
            // Ignore messages from self
            if (message.id == options.myself.id) {
                return;
            }
            const player: Player = message;
            push(player);
            announceMyself();
        },
        onClose: () => {
            players = [];
            options.onChange(players);
            if (presenceInterval != null) {
                window.clearInterval(presenceInterval);
            }
        },
        validateMessage: (message: unknown) => {
            return (
                !!message &&
                typeof message === "object" &&
                "id" in message &&
                "name" in message &&
                "status" in message
            );
        },
    });

    function announceMyself() {
        const now = Date.now();
        if (now - announcedAt >= MIN_ANNOUNCE_PAUSE) {
            connection.send(options.myself);
            announcedAt = now;
        }
    }
    return connection;
}
