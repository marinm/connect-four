import { GoToPage } from "../types/GoToPage"

type PropType = {
	goToPage: GoToPage
};

export default function StartPage({goToPage}: PropType) {

	const name: string | null = window.localStorage.getItem("name");
	const id: string | null = window.localStorage.getItem("id");

	return (
		<div className="page">
			<h1 className="inverted">Connect Four</h1>
			Playing as {name} id {id}
			<button onClick={ () => goToPage("connect") }>New Game</button>
			<button onClick={ () => goToPage("connect") }>Play</button>
			<button onClick={ () => goToPage("name") }>Change Name</button>
		</div>
	);
}
