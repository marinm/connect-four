import { useState } from "react";
import { useX } from "./hooks/useX";
import "./App.css";

function App() {
    const [p, setP] = useState<number>(0);

    const x1 = useX({ p });
    const x2 = useX({ p: p * 2 });

    return (
        <div>
            <input
                type="number"
                value={p}
                onChange={(e) => setP(parseInt(e.target.value))}
            />
            {x1}, {x2}
        </div>
    );
}

export default App;
