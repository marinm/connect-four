import { GoToPage } from "../types/GoToPage";
import OnlineList from "./OnlineList";
import { Player } from "../types/Player";

type Props = {
    myself: Player,
    goToPage: GoToPage;
};

export default function PlayersPage(props: Props) {
    return (
        <div className="page">
            <h1 className="inverted">Connect Four</h1>
            <OnlineList myself={props.myself} goToPage={props.goToPage} />
        </div>
    );
}
