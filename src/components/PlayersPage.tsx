import { GoToPage } from "../types/GoToPage";
import OnlineList from "./OnlineList";
import { Player, PlayerStatus } from "../types/Player";

type PropType = {
    goToPage: GoToPage;
};

export default function PlayersPage({ goToPage }: PropType) {
    const myself: Player = {
        id: window.localStorage.getItem("id") ?? "",
        name: window.localStorage.getItem("name") ?? "",
        status: PlayerStatus.Ready,
    };

    return (
        <div className="page">
            <h1 className="inverted">Connect Four</h1>
            <OnlineList myself={myself} goToPage={goToPage} />
        </div>
    );
}
