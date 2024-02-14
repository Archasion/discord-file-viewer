import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import routes from "../src/app";

const app = Fastify({
    logger: process.env.NODE_ENV === "development"
});

app.register(routes);

export default async (req: FastifyRequest, res: FastifyReply) => {
    await app.ready();
    app.server.emit("request", req, res);
}