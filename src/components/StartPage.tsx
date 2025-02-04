import { GoToPage } from "../types/GoToPage"

type PropType = {
	goToPage: GoToPage
};

export default function StartPage({goToPage}: PropType) {
	return (
		<div className="page">
			<h1>Start Page</h1>
			<button onClick={ () => goToPage("connect") }>New Game</button>
			<button onClick={ () => goToPage("connect") }>Play</button>
		</div>
	);
}
