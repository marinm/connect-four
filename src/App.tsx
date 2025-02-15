import "./App.css";
import EasyWebSocketControls from "./components/EasyWebSocketControls";
import { randomDigits } from "./utils/randomDigits";
import { useState } from "react";

function App() {
    const [names, setNames] = useState<string[]>([]);
    const channel = randomDigits(8);

    const broadcastURL = `https://marinm.net/broadcast?channel=${channel}`;

    function add() {
        setNames([...names, randomDigits(8)]);
    }

    function remove(name: string) {
        setNames(names.filter((n) => n != name));
    }

    return (
        <div>
            <button onClick={() => add()}>Add</button>
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Controls</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map((name) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>
                                <EasyWebSocketControls
                                    name={name}
                                    url={broadcastURL}
                                />
                            </td>
                            <td>
                                <button onClick={() => remove(name)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
