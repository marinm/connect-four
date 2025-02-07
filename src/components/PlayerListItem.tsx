import { Player } from "../types/Player";
import { GoToPage } from "../types/GoToPage";

type Options = {
    player: Player;
    isMyself: boolean;
    goToPage: GoToPage;
};

export default function PlayerListItem({ player, goToPage }: Options) {
    return (
        <li onClick={() => goToPage("connect")}>
            <div>{player.name}</div>
            <div>{player.status}</div>
        </li>
    );
}
