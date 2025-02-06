import { Player } from "../types/Player";

export default class PlayerList {
    players: Player[] = [];

    constructor(players: Player[]) {
        this.players = players;
    }

    all() {
        return [...this.players];
    }

    findIndex(player: Player) {
        return this.players.findIndex((p) => p.id === player.id);
    }

    push(player: Player) {
        const index = this.findIndex(player);
        if (index === -1) {
            this.players.push(player);
        }
    }
}
