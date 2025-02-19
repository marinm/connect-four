type Props = {
    label: string;
    on: boolean;
    error: boolean;
};

export function StatusBadge(props: Props) {
    const indicatorColor = props.error ? "red" : props.on ? "#b0f61b" : "gray";

    return (
        <div
            style={{
                fontSize: "0.7rem",
                flexGrow: "1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "uppercase",
                backgroundColor: "#eca55c",
                padding: "0.5ch 1ch",
                borderRadius: "0.5ch",
            }}
        >
            {props.label}
            <div
                style={{
                    width: "1ch",
                    height: "1ch",
                    backgroundColor: indicatorColor,
                    borderRadius: "50%",
                }}
            ></div>
        </div>
    );
}
