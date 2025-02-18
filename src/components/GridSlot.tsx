import { classes } from "../utils/classes";

type Props = {
    value: number;
    connected: boolean;
    select: () => void;
};

export default function GridSlot(props: Props) {
    const slotClasses = classes({
        connected: props.connected,
    });

    const tokenClasses = classes({
        "player-1": props.value === 0,
        "player-2": props.value === 1,
    });

    return (
        <div
            className={"grid-slot " + slotClasses}
            onClick={() => props.select()}
        >
            <div className={"token " + tokenClasses}></div>
        </div>
    );
}
