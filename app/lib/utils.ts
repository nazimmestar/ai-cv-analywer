export function formatSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes <= 0) {
        return "0 KB";
    }

    const units = ["KB", "MB", "GB"] as const;
    let size = bytes / 1024;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex += 1;
    }

    const formattedSize = size >= 10 ? size.toFixed(0) : size.toFixed(1);

    return `${formattedSize} ${units[unitIndex]}`;
}

export const generateUUID = ()=> crypto.randomUUID();

