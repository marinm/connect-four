type Props = {
    value: null | number;
    connected: boolean;
    select: () => void;
};

export default function GridSlot(props: Props) {
    const nullStyle = {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
    };

    const player0Style = {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: "#cb6155",
        border: "0.1ch solid #793914",
    };

    const player1Style = {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: "#5498cc",
        border: "0.1ch solid #2e566f",
    };

    const style = {
        ...nullStyle,
        ...(props.value === 0 ? player0Style : {}),
        ...(props.value === 1 ? player1Style : {}),
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div
            onClick={() => props.select()}
            style={{
                aspectRatio: "1",
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <div style={style}>{props.connected ? "✅" : ""}</div>
        </div>
    );
}
