import { GoToPage } from "../types/GoToPage"

type propType = {
	goToPage: GoToPage
};

export default function ConnectPage({goToPage}: propType) {
	return (
		<div className="page">
			<h1>Connect Page</h1>
			<button onClick={ () => goToPage("start") }>Back</button>
			<button onClick={ () => goToPage("play") }>Play</button>
		</div>
	);
}
