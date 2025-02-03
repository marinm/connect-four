function getClass(value: number): string {
	switch (value) {
		case 0:
			return "";
		case 1:
			return "player-1";
		case 2:
			return "player-2";
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
            <div className={"token " + getClass(value)}></div>
        </div>
    );
}
