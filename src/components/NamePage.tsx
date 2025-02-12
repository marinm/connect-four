import { useState } from "react";

type PropType = {
    currentName: string;
    saveName: (name: string) => void;
};

export default function NamePage({ currentName, saveName }: PropType) {
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

    function trySave() {
        if (!name) {
            return;
        }

        saveName(name);
    }

    return (
        <div className="page">
            What's your name?
            <input
                type="text"
                value={name}
                onChange={(event) => setSanitizedName(event.target.value)}
            />
            <button type="button" onClick={trySave}>
                Done
            </button>
        </div>
    );
}
