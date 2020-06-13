'use strict';

const services = require('../services');

// Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, 
// debe invocar next() para pasar el control a la siguiente función de middleware. 
// De lo contrario, la solicitud quedará colgada.
function isAuth(req, res, next) {
    // solicitamos authorization dentro de los headers del mensaje
    console.log("Verificando header authorization");
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion' });
    }
    // obtenemos el token del header 
    console.log("Verificando authorization token");
    const token = req.headers.authorization;
    services.decodeToken(token)
        .then(response => {
            req.user = response;
            console.log("Authorization token OK");
            next();
        })
        .catch(response => {
            console.log("Authorization decodeToken error");
            res.status(response.status).send({ message: response.message });
        });
}

module.exports = isAuth;