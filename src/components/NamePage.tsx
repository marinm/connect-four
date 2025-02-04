import { useState } from "react";
import { GoToPage } from "../types/GoToPage";

type PropType = {
    goToPage: GoToPage;
};

export default function NamePage({}: PropType) {
    const [name, setName] = useState<string>("");

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

    return (
        <div className="page">
            What's your name?
            <input
                type="text"
                value={name}
                onChange={(event) => setSanitizedName(event.target.value)}
            />
            <button type="button">Done</button>
        </div>
    );
}
