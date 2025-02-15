import { useEffect, useRef, useState } from "react";

type PropType = {
    currentName: string;
    setName: (name: string) => void;
};

export default function NamePage({ currentName, setName }: PropType) {
    const [value, setValue] = useState<string>(currentName);
    const inputRef = useRef<HTMLInputElement>(null);

    function setSanitizedName(input: string): void {
        const validChars =
            "abcdefghijklmnopqrstuvwxyz" +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "0123456789";
        const sanitized = input
            .split("")
            .filter((c) => validChars.includes(c))
            .join("");
        setValue(sanitized);
    }

    function trySave() {
        if (!value) {
            return;
        }

        setName(value);
    }

    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="page">
            What's your name?
            <input
                type="text"
                ref={inputRef}
                autoComplete="off"
                value={value}
                onChange={(event) => setSanitizedName(event.target.value)}
            />
            <button type="button" onClick={trySave}>
                Done
            </button>
        </div>
    );
}
