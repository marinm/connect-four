import { GoToPage } from "../types/GoToPage"

type PropType = {
	goToPage: GoToPage
};

export default function StartPage({goToPage}: PropType) {

	const name: string | null = window.localStorage.getItem("name");

	return (
		<div className="page">
			<h1>Start Page</h1>
			Playing as {name}
			<button onClick={ () => goToPage("connect") }>New Game</button>
			<button onClick={ () => goToPage("connect") }>Play</button>
			<button onClick={ () => goToPage("name") }>Change Name</button>
		</div>
	);
}
