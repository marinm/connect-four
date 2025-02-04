import { classList } from "../utils/classList";

type Props = {
    index: number;
    value: number;
    select: (index: number) => void;
    connected: boolean;
};

export default function GridSlot({ index, value, select, connected }: Props) {
    const slotClasses = classList({
        "grid-slot": true,
        connected: connected,
    });

    const tokenClasses = classList({
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
