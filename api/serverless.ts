import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fastifyRateLimit from "@fastify/rate-limit";

import * as routes from "./routes/index.ts";

// Create a Fastify instance
const fastify = Fastify({
    logger: process.env.NODE_ENV === "development"
});

// Set up rate limit
await fastify.register(fastifyRateLimit, {
    max: 45, // Slightly below Discord's rate limit (50)
    timeWindow: 1000 // 1 second
});

// Routes
fastify.get("/", routes.index);
fastify.get("/files", routes.fileViewer);

// Start the server
// noinspection JSUnusedGlobalSymbols
export default async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    await fastify.ready();
    fastify.server.emit("request", req, res);
}