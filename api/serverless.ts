import routes from "../src/app";
import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
    logger: false,
});

app.register(routes, { prefix: "/" });

export default async (req: FastifyRequest, res: FastifyReply) => {
    await app.ready();
    app.server.emit("request", req, res);
};