export function hexDecode(hex: string): string {
    return Buffer.from(hex, 'hex').toString();
}
