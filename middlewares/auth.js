'use strict';

const services = require('../services');

// Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, 
// debe invocar next() para pasar el control a la siguiente función de middleware. 
// De lo contrario, la solicitud quedará colgada.
function isAuth(req, res, next) {
    // solicitamos authorization dentro de los headers del mensaje
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion'});
    }
    // para obtener el token busco la segunda posición del array 
    const token = req.headers.authorization.split(" ")[1];
    services.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(response => {
            res.status(response.status);
        });
}

module.exports = isAuth;