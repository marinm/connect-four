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

export default class PresenceConnection extends ServerConnection<PresenceMessage> {
    presenceInterval: number | null = null;
    players: Player[] = [];
    announcedAt: number = 0;
    options: Options;

    constructor(options: Options) {
        super({
            url: config.serverURL,
            onOpen: () => {
                this.announceMyself(true);
                this.push(options.myself);

                this.presenceInterval = window.setInterval(() => {
                    this.announceMyself();
                }, MAX_ANNOUNCE_PAUSE);
            },
            onMessage: (message: PresenceMessage) => {
                // Ignore messages from self
                if (message.id == options.myself.id) {
                    return;
                }
                const player: Player = message;
                this.push(player);
                this.announceMyself();
            },
            onClose: () => {
                this.players = [];
                options.onChange(this.players);
                if (this.presenceInterval != null) {
                    window.clearInterval(this.presenceInterval);
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
        this.options = options;
    }

    same(current: Player, prev: Player) {
        return current.name === prev.name && current.status === prev.status;
    }

    push(player: Player) {
        const index = this.players.findIndex((p) => p.id === player.id);

        // Do nothing if the player hasn't changed
        if (index > -1 && this.same(player, this.players[index])) {
            return;
        }

        if (index > -1) {
            this.players[index] = player;
        } else {
            this.players.push({ ...player });
        }
        this.options.onChange(this.players);
    }

    announceMyself(immediately: boolean = false) {
        const now = Date.now();
        if (
            immediately ||
            this.announcedAt == 0 ||
            now - this.announcedAt >= MIN_ANNOUNCE_PAUSE
        ) {
            this.send(this.options.myself);
            this.announcedAt = now;
        }
    }

    updateMyself(myself: Player) {
        this.push(myself);
        this.announceMyself(true);
    }
}
