import { Player } from "../types/Player";
import { GoToPage } from "../types/GoToPage";

type Options = {
    player: Player;
    isMyself: boolean;
	goToPage: GoToPage;
};

export default function PlayerListItem({ player, isMyself, goToPage }: Options) {
    return (
        <li onClick={() => goToPage("connect")}>
            <div>
                {player.name}
            </div>
            <div>{isMyself ? (
                    <button onClick={() => goToPage("name")}>
                        Change Name
                    </button>
                ) : (
                    player.status
                )}</div>
        </li>
    );
}
