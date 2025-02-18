import { classes } from "../utils/classes";

type Props = {
    value: number;
    connected: boolean;
    select: () => void;
};

export default function GridSlot(props: Props) {
    const slotClasses = classes({
        "grid-slot": true,
        connected: props.connected,
    });

    const tokenClasses = classes({
        token: true,
        "player-1": props.value === 1,
        "player-2": props.value === 2,
    });

    return (
        <div className={slotClasses} onClick={() => props.select()}>
            <div className={tokenClasses}></div>
        </div>
    );
}
