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
			<div className="user-name-bar">
				{name}
				<button onClick={ () => goToPage("name") }>Change Name</button>
			</div>
			
			
		</div>
	);
}
