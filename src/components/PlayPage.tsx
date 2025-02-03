import { GoToPage } from "../types/GoToPage"

type propType = {
	goToPage: GoToPage
};

export default function PlayPage({goToPage}: propType) {
	return (
		<div className="page">
			<h1>Play Page</h1>
			<button onClick={ () => goToPage("start") }>Leave</button>
		</div>
	);
}
