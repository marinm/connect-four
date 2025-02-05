export function randomDigits(n: number): string {
    if (n < 1) {
        return "";
    }

    // one unsigned 32-bit number has the range [0, 4,294,967,296 - 1]
    // Can provide 8 digits.
    const array = new Uint32Array(Math.ceil(n / 8));

    self.crypto.getRandomValues(array);

    return [...array]
        .map((num) => num.toString().padStart(8, "0"))
        .join("")
        .slice(0, n);

    return "";
}
