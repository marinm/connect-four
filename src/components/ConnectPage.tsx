import { GoToPage } from "../types/GoToPage";

type PropType = {
    goToPage: GoToPage;
};

export default function ConnectPage({ goToPage }: PropType) {
    return (
        <div className="page">
            <h1>Connect Page</h1>
            <button onClick={() => goToPage("players")}>Back</button>
            <button onClick={() => goToPage("play")}>Play</button>
        </div>
    );
}
