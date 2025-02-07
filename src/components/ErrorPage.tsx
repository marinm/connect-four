import { GoToPage } from "../types/GoToPage";

type PropType = {
    goToPage: GoToPage;
};

export default function ErrorPage({ goToPage }: PropType) {
    return (
        <div className="page">
            <h1>Error Page</h1>
            <button onClick={() => goToPage("players")}>Back</button>
        </div>
    );
}
