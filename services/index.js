'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {
    // los datos que viajan entre cliente y servidor (solo info basica)
    console.log("Creando token...");
    const payload = {
        // convendria que no sea el id de usuario, pero por simplicidad hacemos sub: user._id
        sub: user._id,
        // fecha de creacion del token
        iat: moment().unix(),
        // fecha de expiracion del token
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {

            // intento decodificar el token
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            // si el token caduco
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });              
            }
            // si el token es correcto, devuelvo el token decodificado
            resolve(payload.sub);

        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}