import { GoToPage } from "../types/GoToPage"
import GameGrid from "./GameGrid";

type propType = {
	goToPage: GoToPage
};

export default function PlayPage({goToPage}: propType) {
	return (
		<div className="page">
			<GameGrid />
			<button onClick={ () => goToPage("start") }>Leave</button>
		</div>
	);
}
