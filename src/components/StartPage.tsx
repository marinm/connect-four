import { GoToPage } from "../types/GoToPage"
import OnlineList from "./OnlineList";

type PropType = {
	goToPage: GoToPage
};

export default function StartPage({goToPage}: PropType) {

	const name: string | null = window.localStorage.getItem("name");

	return (
		<div className="page">
			<h1 className="inverted">Connect Four</h1>
			<div className="user-name-bar">
				{name}
				<button onClick={ () => goToPage("name") }>Change Name</button>
			</div>
			<OnlineList />
		</div>
	);
}
