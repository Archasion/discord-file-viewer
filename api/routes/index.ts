import type { FastifyReply, FastifyRequest } from "fastify";

export function index(_req: FastifyRequest, res: FastifyReply): void {
    res.send("FORMAT: /files?url={encoded_url}");
}

export * from "./files.ts";