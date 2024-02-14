import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fastifyRateLimit from "@fastify/rate-limit";

// Create a Fastify instance
const fastify = Fastify({
    logger: process.env.NODE_ENV === "development"
});

// Set up rate limit
await fastify.register(fastifyRateLimit, {
    max: 45, // Slightly below Discord's rate limit (50)
    timeWindow: 1000 // 1 second
});

// Index route
fastify.get("/", (_req: FastifyRequest, res: FastifyReply) => {
    res.send("FORMAT: /files?url={encoded_url}");
});

// File viewer route
fastify.get("/files", async (req: FastifyRequest<FileViewerQueryParams>, res: FastifyReply) => {
    try {
        const url = decodeURIComponent(req.query.url);
        const response = await fetch(url);
        const content = await response.text();

        res.send(content);
    } catch {
        res.send("Failed to fetch file content, please double-check the parameters");
    }
});

// Start the server
// noinspection JSUnusedGlobalSymbols
export default async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    await fastify.ready();
    fastify.server.emit("request", req, res);
}

interface FileViewerQueryParams {
    Querystring: {
        url: string;
    }
}