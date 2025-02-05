export function parseJSON(message: string): any {
    try {
        return JSON.parse(message);
    } catch (e) {}

    return null;
}
