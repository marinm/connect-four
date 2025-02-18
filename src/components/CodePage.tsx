import { useState } from "react";
import { classes } from "../utils/classes";
import { Room } from "../hooks/useRoom";
import { CODE_LENGTH } from "../config";

type Props = {
    room: Room;
};

export function CodePage({ room }: Props) {
    const [position, setPosition] = useState(0);
    const [friendCode, setFriendCode] = useState<number[]>(
        Array(CODE_LENGTH).fill(0)
    );

    function enterNumber(n: number) {
        friendCode[position] = n;
        setFriendCode([...friendCode]);

        // If on the last digit, stay there
        setPosition(
            position === CODE_LENGTH - 1
                ? CODE_LENGTH - 1
                : (position + 1) % CODE_LENGTH
        );
    }

    const positions = Array(CODE_LENGTH)
        .fill(0)
        .map((_, i) => i);

    return (
        <div className="page">
            <div id="screen-code-input" className="screen">
                Your code
                <div
                    style={{
                        backgroundColor: "#FFF9EC",
                        border: "0.2ch solid #FFD36A",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                        padding: "1ch",
                        textAlign: "center",
                        borderRadius: "1ch",
                        outline: "0.2ch solid #994F11",
                    }}
                >
                    {positions.map((n) => (
                        <div key={n}>{room.myId[n]}</div>
                    ))}
                </div>
                <div>Enter friend's code</div>
                <div id="friend-code">
                    {positions.map((n) => (
                        <div
                            key={n}
                            className={classes({
                                digit: true,
                                inverted: position === n,
                            })}
                            onClick={() => setPosition(n)}
                        >
                            {friendCode[n]}
                        </div>
                    ))}
                </div>
                <div className="keypad">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <button
                            key={n}
                            className="keypad-btn"
                            onClick={() => enterNumber(n)}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => room.join(friendCode.join(""))}
                    style={{
                        fontSize: "0.8rem",
                        backgroundColor: "#e49d53",
                        border: "0.3ch solid #994F11",
                        borderRadius: "0.7ch",
                        color: "#fff7e0",
                        fontWeight: "bold",
                        padding: "0.5ch 1ch",
                    }}
                >
                    PAIR
                </button>
            </div>
        </div>
    );
}
