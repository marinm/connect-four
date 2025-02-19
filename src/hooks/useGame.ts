import { useState } from "react";
import { Position } from "../types/Position";

const N_ROWS = 6;
const N_COLS = 7;

export type Game = {
    grid: (null | number)[];
    turn: 0 | 1;
    four: Position[];
    on: boolean;
    start: () => void;
    stop: () => void;
    drop: (player: number, col: number) => void;
    positionAt: (index: number) => Position;
};

function emptyGrid(): number[] {
    return new Array(N_ROWS * N_COLS).fill(null);
}

// The grid, and whose turn it is, and if there's 4 connected
export function useGame(): Game {
    const [grid, setGrid] = useState<(null | number)[]>(emptyGrid());
    const [turn, setTurn] = useState<0 | 1>(0);
    const [four, setFour] = useState<Position[]>([]);
    const [on, setOn] = useState(false);

    function start() {
        // If the game is already on, do nothing
        if (on) {
            return;
        }
        setOn(true);
    }

    function stop() {
        // If the game is not on, then do nothing
        if (!on) {
            return;
        }
        setOn(false);
    }

    function at(p: Position): null | number {
        return grid[indexAt(p)];
    }

    function positionAt(index: number): Position {
        return {
            i: N_ROWS - 1 - Math.floor(index / N_COLS),
            j: index % N_COLS,
        };
    }

    function indexAt(p: Position): number {
        return (N_ROWS - p.i - 1) * N_COLS + p.j;
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
            .every((value, _, array) => value != null && value === array[0]);
    }

    function fourSame(p: Position): Position[] | null {
        const segments = segmentsFrom(p);
        const match = segments.findIndex((s) => allSame(s));

        return match == -1 ? null : segments[match];
    }

    function findFour(): Position[] | null {
        const search = grid
            .map((_, index) => positionAt(index))
            .filter((p) => fourSame(p) != null);

        return search.length ? fourSame(search[0]) : null;
    }

    function nextEmptyRow(column: number): number | null {
        for (let i = 0; i < N_ROWS; i++) {
            if (grid[indexAt({ i, j: column })] === null) {
                return i;
            }
        }
        return null;
    }

    function drop(player: number, col: number): void {
        if (!on) {
            console.log("game over");
            return;
        }

        // This shouldn't happen, but check anyways
        if (player !== turn) {
            console.log("drop out of turn");
            return;
        }

        const row = nextEmptyRow(col);

        if (row != null) {
            grid[indexAt({ i: row, j: col })] = turn;
        }

        setGrid([...grid]);

        const connected = findFour();

        if (connected) {
            console.log(connected);
            setFour(connected);
            setOn(false);
            return;
        }

        setTurn(turn === 0 ? 1 : 0);
    }

    return {
        grid,
        turn,
        four,
        on,
        start,
        stop,
        drop,
        positionAt,
    };
}
