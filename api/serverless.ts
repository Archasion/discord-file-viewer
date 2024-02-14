import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";

const app = Fastify({
    logger: process.env.NODE_ENV === "development"
});

app.register(import("../src/app"));

export default async (req: FastifyRequest, res: FastifyReply) => {
    await app.ready();
    app.server.emit("request", req, res);
}