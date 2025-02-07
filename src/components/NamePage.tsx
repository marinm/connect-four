import { useState } from "react";
import { GoToPage } from "../types/GoToPage";

type PropType = {
    currentName: string;
    goToPage: GoToPage;
};

export default function NamePage({ currentName, goToPage }: PropType) {
    const [name, setName] = useState<string>(currentName);

    function setSanitizedName(input: string): void {
        const validChars =
            "abcdefghijklmnopqrstuvwxyz" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "0123456789";
        const sanitized = input
            .split("")
            .filter((c) => validChars.includes(c))
            .join("");
        setName(sanitized);
    }

    function saveName(): void {
        if (!name.length) {
            return;
        }

        window.localStorage.setItem("name", name);
        goToPage("players");
    }

    return (
        <div className="page">
            What's your name?
            <input
                type="text"
                value={name}
                onChange={(event) => setSanitizedName(event.target.value)}
            />
            <button type="button" onClick={() => saveName()}>
                Done
            </button>
        </div>
    );
}
