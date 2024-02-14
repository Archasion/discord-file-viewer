import type { FastifyReply, FastifyRequest } from "fastify";

export async function fileViewer(req: FastifyRequest<FileViewerQueryParams>, res: FastifyReply): Promise<void> {
    try {
        const url = decodeURIComponent(req.query.url);
        const response = await fetch(url);
        const content = await response.text();

        res.send(content);
    } catch {
        res.send("Failed to fetch file content, please double-check the parameters");
    }
}

interface FileViewerQueryParams {
    Querystring: {
        url: string;
    }
}