import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";

const fastify = Fastify({
    logger: process.env.NODE_ENV === "development"
});

fastify.get("/", async (_req, res) => {
    res.send("FORMAT: /attachments?url={encoded_url}");
});

fastify.get("/attachments", async (req: FastifyRequest<{ Querystring: Record<"url", string> }>, res) => {
    try {
        const url = decodeURIComponent(req.query.url);
        const response = await fetch(url);
        const content = await response.text();

        res.send(content);
    } catch {
        res.send("Failed to fetch file content, please double-check the parameters");
    }
});

export default async (req: FastifyRequest, res: FastifyReply) => {
    await fastify.ready();
    fastify.server.emit("request", req, res);
}