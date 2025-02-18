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
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1ch",
                }}
            >
                <div style={{ display: "flex", gap: "2ch" }}>
                    <div
                        style={{
                            border: "0.2ch solid #FFD36A",
                            outline: "0.2ch solid #994F11",
                            borderRadius: "0.5ch",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.5rem",
                                textAlign: "center",
                                backgroundColor: "#994F11",
                                color: "#FFF9EC",
                                padding: "0.5ch",
                                borderBottom: "0.5ch solid #FFD873",
                            }}
                        >
                            MY CODE
                        </div>
                        <div
                            style={{
                                backgroundColor: "#FFF9EC",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "fit-content",
                                padding: "1ch",
                                textAlign: "center",
                            }}
                        >
                            {positions.map((n) => (
                                <div key={n}>{room.myId[n]}</div>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{
                            border: "0.2ch solid #FFD36A",
                            outline: "0.2ch solid #994F11",
                            borderRadius: "0.5ch",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.5rem",
                                textAlign: "center",
                                backgroundColor: "#994F11",
                                color: "#FFF9EC",
                                padding: "0.5ch",
                                borderBottom: "0.5ch solid #FFD873",
                            }}
                        >
                            FRIEND
                        </div>
                        <div
                            style={{
                                backgroundColor: "#FFF9EC",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "fit-content",
                                padding: "1ch",
                                textAlign: "center",
                            }}
                        >
                            {positions.map((n) => (
                                <div
                                    key={n}
                                    className={classes({
                                        inverted: position === n,
                                    })}
                                    onClick={() => setPosition(n)}
                                >
                                    {friendCode[n]}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gridTemplateRows: "1fr 1fr",
                        gap: "0.3rem",
                        width: "90%",
                        maxWidth: "10cm",
                    }}
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <button
                            key={n}
                            onClick={() => enterNumber(n)}
                            style={{
                                fontSize: "1rem",
                                backgroundColor: "transparent",
                                borderRadius: "0.2rem",
                                borderWidth: "0.1rem 0.1rem 0.2rem 0.1rem",
                                aspectRatio: "1",
                                padding: "0",
                                margin: "0",
                            }}
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
