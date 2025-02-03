import { GoToPage } from "../types/GoToPage"

type propType = {
	goToPage: GoToPage
};

export default function ErrorPage({goToPage}: propType) {
	return (
		<div className="page">
			<h1>Error Page</h1>
			<button onClick={ () => goToPage("start") }>Back</button>
		</div>
	);
}
