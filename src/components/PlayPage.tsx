import { GoToPage } from "../types/GoToPage"
import GameGrid from "./GameGrid";

type PropType = {
	goToPage: GoToPage
};

export default function PlayPage({goToPage}: PropType) {
	return (
		<div className="page">
			<GameGrid />
			<button onClick={ () => goToPage("start") }>Leave</button>
		</div>
	);
}
