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
	const [gameOver, setGameOver] = useState<boolean>(false);

    function at(p: Position): number {
        return grid[toIndex(p)];
    }

    function segmentsFrom(p: Position): Position[][] {
        const { i, j } = p;

        const leftHorizontal =
            p.j < 3
                ? null
                : [
                      { i: i + 0, j: j - 0 },
                      { i: i + 0, j: j - 1 },
                      { i: i + 0, j: j - 2 },
                      { i: i + 0, j: j - 3 },
                  ];

        const leftDiagonal =
            p.i > 2 || p.j < 3
                ? null
                : [
                      { i: i + 0, j: j - 0 },
                      { i: i + 1, j: j - 1 },
                      { i: i + 2, j: j - 2 },
                      { i: i + 3, j: j - 3 },
                  ];

        const up =
            p.i > 2
                ? null
                : [
                      { i: i + 0, j: j - 0 },
                      { i: i + 1, j: j - 0 },
                      { i: i + 2, j: j - 0 },
                      { i: i + 3, j: j - 0 },
                  ];

        const rightDiagonal =
            p.i > 2 || p.j > 3
                ? null
                : [
                      { i: i + 0, j: j + 0 },
                      { i: i + 1, j: j + 1 },
                      { i: i + 2, j: j + 2 },
                      { i: i + 3, j: j + 3 },
                  ];

        const rightHorizontal =
            p.j > 3
                ? null
                : [
                      { i: i + 0, j: j + 0 },
                      { i: i + 0, j: j + 1 },
                      { i: i + 0, j: j + 2 },
                      { i: i + 0, j: j + 3 },
                  ];

        return [
            leftHorizontal,
            leftDiagonal,
            up,
            rightDiagonal,
            rightHorizontal,
        ].filter((s) => s != null);
    }

    function allSame(segment: Position[]): boolean {
        return segment
            .map((p) => at(p))
            .every((value, _, array) => value != 0 && value === array[0]);
    }

    function four(p: Position): Position[] | null {
        const segments = segmentsFrom(p);
        const match = segments.findIndex((s) => allSame(s));

        return match == -1 ? null : segments[match];
    }

    function findFour(): Position[] | null {
        const search = grid
            .map((_, index) => position(index))
            .filter((p) => four(p) != null);

        return search.length ? four(search[0]) : null;
    }

    function nextEmptyRow(column: number): number | null {
        for (let i = 0; i < N_ROWS; i++) {
            if (grid[toIndex({ i, j: column })] === 0) {
                return i;
            }
        }
        return null;
    }

    function select(index: number): void {
		if (gameOver) {
			return;
		}
        const p = position(index);
        const col = p.j;
        const row = nextEmptyRow(col);

        if (row != null) {
            grid[toIndex({ i: row, j: col })] = playerTurn + 1;
        }

        setGrid([...grid]);

        const connected = findFour();

        if (connected) {
			setGameOver(true);
            return;
        }

        setTurn(turn + 1);
    }


    const playerTurn = turn % 2;

	let message = "";
	if (gameOver) {
		message = `Winner! Player ${playerTurn}`;
	} else {
		if (playerTurn == 0) {
			message = "Your turn player 1";
		} else if (playerTurn == 1) {
			message = "Your turn player 2";
		}
	}

    return (
        <>
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
            {message}
        </>
    );
}
