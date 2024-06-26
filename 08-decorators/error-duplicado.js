/*
    NOTA: Este script va a causar error, el objetivo es que veas que la declaracion doble de un hook
    provocará un error en Fastify como lo indica la documentacion
*/

const fastify = require("fastify");
const server = fastify({
    logger: {
        level: "warn",
        // prettyPrint: true,
    },
});

//  Promesa para simular validacion de token, el token debe ser "540deg"
const getUserData = (token) =>
    new Promise((resolve, reject) => {
        if (token === "540deg") {
            resolve({
                id: 1,
                name: "Unai",
                surname: "Pere",
            });
        } else {
            reject();
        }
    });

server.decorateRequest("user", "");

server.get("/books", {
    //  Recuerda que con async ya no necesitamos done
    preHandler: async (request, reply) => {
        try {
            //  Obtenemos el token enviado en las cabeceras
            const token = request.headers["authorization"];

            console.log(token);

            //  Vamos a simular que obtenemos datos a partir del token
            const userData = await getUserData(token);

            // Con el decorator ahora si esto es correcto
            request.user = userData.name;

            return;
        } catch (error) {
            return reply
                .code(400)
                .send({ error: "No se pudo obtener datos del usuario" });
        }
    },
    handler: (request, reply) => {
        //  Declarar otra vez el decorator causará un error de ejecucion
        server.decorateRequest("user", "Nuevo nombre");

        reply.send({
            books: ["100 años de soledad", "La metamorfosis"],
            user: request.user,
        });
    },
});

server.listen(3000, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log("Fastify corriendo en el puerto 3000");
});