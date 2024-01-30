import Fastify, { type FastifyRequest } from "fastify";
import { parsePort } from "./utils.ts";

// Set up the server
const fastify = Fastify({
    logger: process.env.NODE_ENV === "development"
});

// Set up a rate limiter to prevent abuse of Discord's API
await fastify.register(import("@fastify/rate-limit"), {
    max: 25, // Half of Discord's rate limit (50/sec)
    timeWindow: 1000
});

// Base response
fastify.get("/", (_req, res) => {
    res.send("FORMAT: /:channelId/:attachmentId/:filename");
});

// Get the raw content of a file
fastify.get("/:channelId/:attachmentId/:filename", async (req: FastifyRequest<{ Params: AttachmentParams }>, res) => {
    const { channelId, attachmentId, filename } = req.params;

    try {
        const url = `https://cdn.discordapp.com/attachments/${channelId}/${attachmentId}/${filename}.txt`;
        const response = await fetch(url);
        const content = await response.text();

        res.send(content);
    } catch (err) {
        res.send("Failed to fetch file content, please double-check the input");
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

interface AttachmentParams {
    channelId: string;
    attachmentId: string;
    filename: string;
}