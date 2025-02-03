function displayValue(slotValue: number): string {
    switch (slotValue) {
        case 0:
            return "";
        case 1:
            return "X";
        case 2:
            return "O";
    }

    return "";
}

type Props = {
    index: number;
    value: number;
    select: (index: number) => void;
};

export default function GridSlot({ index, value, select }: Props) {
    return (
        <div className="grid-slot" onClick={() => select(index)}>
            {displayValue(value)}
        </div>
    );
}
