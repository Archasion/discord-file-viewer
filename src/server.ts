import Fastify, { type FastifyRequest } from "fastify";
import { parsePort } from "./utils.ts";

// Set up the server
export const fastify = Fastify({
    logger: process.env.NODE_ENV === "development"
});

// Set up a rate limiter to prevent abuse of Discord's API
await fastify.register(import("@fastify/rate-limit"), {
    max: 45, // Slightly lower than Discord's rate limit (50/sec)
    timeWindow: 1000
});

// Base response
fastify.get("/", (_req, res) => {
    res.send("FORMAT: /attachments?url={encoded_url}");
});

// Get the raw content of a file
fastify.get("/attachments", async (req: FastifyRequest<{ Querystring: Record<"url", string> }>, res) => {
    try {
        const url = decodeURIComponent(req.query.url);
        const response = await fetch(url);
        const content = await response.text();

        res.send(content);
    } catch (err) {
        res.send("Failed to fetch file content, please double-check the query");
    }
});

try {
    // Start the server
    await fastify.listen({
        port: parsePort(process.env.PORT ?? "3000")
    });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}

export default fastify;