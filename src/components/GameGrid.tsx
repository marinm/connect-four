import { useState } from "react";

const N_ROWS = 6;
const N_COLS = 7;

type Position = {
    i: number;
    j: number;
};

function emptyGrid(): number[] {
    return new Array(N_ROWS * N_COLS).fill(0);
}

function position(index: number): Position {
    return {
        i: (N_ROWS - 1) - Math.floor(index / N_COLS),
        j: index % N_COLS,
    };
}

export default function GameGrid() {
    const [grid, setGrid] = useState<number[]>(emptyGrid());

    function select(index: number): void {
        for (let it = 0; it < grid.length; it++) {
			if (position(it).j === position(index).j) {
				grid[it] += 1;
			}
		}
        setGrid([...grid]);
    }

    return (
        <div className="game-grid">
            {grid.map((slot, index) => (
                <div
                    className="grid-slot"
                    key={index}
                    onClick={() => select(index)}
                >
                    {position(index).i},{position(index).j}
                </div>
            ))}
        </div>
    );
}
