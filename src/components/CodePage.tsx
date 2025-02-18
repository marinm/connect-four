import { useState } from "react";
import { randomDigits } from "../utils/randomDigits";
import { classes } from "../utils/classes";
import { Room } from "../hooks/useRoom";

type Props = {
    room: Room;
};

export function CodePage({ room }: Props) {
    const [position, setPosition] = useState(0);
    const [friendCode, setFriendCode] = useState<number[]>([0, 0, 0, 0]);
    const myCode = randomDigits(4);

    function enterNumber(n: number) {
        friendCode[position] = n;
        setFriendCode([...friendCode]);

        // If on the last digit, stay there
        setPosition(position === 3 ? 3 : (position + 1) % 4);
    }

    function connect() {
        room.join(myCode, friendCode.join(""));
    }

    return (
        <div className="page">
            <div id="screen-code-input" className="screen">
                Your code
                <div id="own-code">
                    {[0, 1, 2, 3].map((n) => (
                        <div key={n} className="digit">
                            {myCode[n]}
                        </div>
                    ))}
                </div>
                <div>Enter friend's code</div>
                <div id="friend-code">
                    {[0, 1, 2, 3].map((n) => (
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
                <button id="connect-btn" onClick={() => connect()}>
                    CONNECT
                </button>
            </div>
        </div>
    );
}
