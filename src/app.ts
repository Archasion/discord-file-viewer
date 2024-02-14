import type { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";

async function app(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
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
}

export default app;