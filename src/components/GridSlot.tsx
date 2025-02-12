import { classes } from "../utils/classes";

type Props = {
    index: number;
    value: number;
    select: (index: number) => void;
    connected: boolean;
};

export default function GridSlot({ index, value, select, connected }: Props) {
    const slotClasses = classes({
        "grid-slot": true,
        connected: connected,
    });

    const tokenClasses = classes({
        token: true,
        "player-1": value === 1,
        "player-2": value === 2,
    });

    return (
        <div className={slotClasses} onClick={() => select(index)}>
            <div className={tokenClasses}></div>
        </div>
    );
}
