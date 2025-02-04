import { GoToPage } from "../types/GoToPage";

type PropType = {
	goToPage: GoToPage
};

export default function NamePage({}: PropType) {
	return (
		<div className="page">
			What's your name?
			<input type="text" />
			<button type="button">Done</button>
		</div>
	)
}