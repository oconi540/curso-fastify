const fastify = require("fastify");

const server = fastify({
    logger: {
        level: "warn",
    },
});

//  Nuestra ruta de prueba
server.get("/", function (request, reply) {
    request.log.info("Soy un log info, no me veras en level warn");
    request.log.warn("Soy un log warn");
    request.log.error("Soy un log error");
    reply.send({
        message: "Fastify works",
    });
});

server.listen(3000, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});