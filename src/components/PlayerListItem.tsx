import { Player } from "../types/Player";

type Options = {
	player: Player;
};

export default function PlayerListItem({player}: Options) {
	return (
		<li>
			<div>{player.name}</div>
			<div>{player.status}</div>
		</li>
	)
}
