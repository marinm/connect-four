export function classes(conditions: Object): string {
    return Object.entries(conditions)
        .filter(([_, value]) => value)
        .map(([key, _]) => key)
        .join(" ");
}
