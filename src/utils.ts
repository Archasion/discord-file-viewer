export function parsePort(port: string): number {
    const parsedPort = parseInt(port, 10);

    if (isNaN(parsedPort)) {
        throw new Error(`Invalid port: ${port}`);
    }

    return parsedPort;
}