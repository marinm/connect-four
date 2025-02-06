export function parseJSON(message: string): unknown {
    try {
        return JSON.parse(message);
    } catch (e) {}

    return null;
}