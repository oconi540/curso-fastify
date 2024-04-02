const fastify = require("fastify");

const server = fastify({
    logger: {
        level: "info"
    }
});

server.addHook("onRequest", function (request, reply, done) {
    console.log("Tipo de done en onRequest:", typeof done);
    request.log.info("Se ejecuta onRequest a nivel aplicación");
    done();
});

server.get("/", {
    onRequest: function (request, reply, done) {
        console.log("Tipo de done en onRequest:", typeof done);
        request.log.info("Se ejecuta onRequest");
        done();
    },
    /*
    En la función preParsing, done no es reconocido como una función. WARN
    preParsing: function (request, reply, done) {
        console.log("Tipo de done en preParsing:", typeof done);
        request.log.info("Se ejecuta preParsing");
        done();
    },
    */
    preValidation: function (request, reply, done) {
        console.log("Tipo de done en preValidation:", typeof done);
        request.log.info("Se ejecuta preValidation");
        done();
    },
    preHandler: function (request, reply, done) {
        console.log("Tipo de done en preHandler:", typeof done);
        request.log.info("Se ejecuta preHandler");
        done();
    },
    handler: function (request, reply) {
        console.log("Tipo de done en handler:", typeof done);
        request.log.info("Se ejecuta handler");
        reply.code(200).send({
            message: "Fastify works!",
        });
    },
    preSerialization: function (request, reply, payload, done) {
        console.log("Tipo de done en preSerialization:", typeof done);
        request.log.info("Se ejecuta preSerialization");
        done(null, payload);
    },
    onSend: function (request, reply, payload, done) {
        console.log("Tipo de done en onSend:", typeof done);
        request.log.info("Se ejecuta onSend");
        done(null, payload);
    },
    onResponse: function (request, reply, done) {
        console.log("Tipo de done en onResponse:", typeof done);
        request.log.info("Se ejecuta onResponse");
        done();
    },
});

server.listen(3000, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
