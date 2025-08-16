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
                width: "1ch",
                height: "1ch",
                backgroundColor: indicatorColor,
                borderRadius: "50%",
            }}
        ></div>
    );
}
