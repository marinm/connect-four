export function classes(conditions: object): string {
    return Object.entries(conditions)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(" ");
}
