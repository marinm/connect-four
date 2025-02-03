import { GoToPage } from "../types/GoToPage"

type propType = {
	goToPage: GoToPage
};

export default function StartPage({goToPage}: propType) {
	return (
		<div className="page">
			<h1>Start Page</h1>
			<button onClick={ () => goToPage("connect") }>New Game</button>
			<button onClick={ () => goToPage("connect") }>Play</button>
		</div>
	);
}
