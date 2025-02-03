import { useState } from "react";
import GridSlot from "./GridSlot";

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
        i: N_ROWS - 1 - Math.floor(index / N_COLS),
        j: index % N_COLS,
    };
}

function toIndex(p: Position): number {
    return (N_ROWS - p.i - 1) * N_COLS + p.j;
}

export default function GameGrid() {
    const [grid, setGrid] = useState<number[]>(emptyGrid());
    const [turn, setTurn] = useState<number>(0);

    const playerTurn = turn % 2;

    function nextEmptyRow(column: number): number | null {
        for (let i = 0; i < N_ROWS; i++) {
            if (grid[toIndex({ i, j: column })] === 0) {
                return i;
            }
        }
        return null;
    }

    function select(index: number): void {
        const p = position(index);
        const col = p.j;
        const row = nextEmptyRow(col);

        if (row != null) {
            grid[toIndex({ i: row, j: col })] = playerTurn + 1;
        }

        setGrid([...grid]);
        setTurn(turn + 1);
    }

    return (
        <div className="game-grid">
            {grid.map((slot, index) => (
                <GridSlot
                    key={index}
                    index={index}
                    value={slot}
                    select={() => select(index)}
                />
            ))}
        </div>
    );
}
