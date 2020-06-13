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
    console.log("Encoding token...");
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            console.log("Intentando decodificar token...");
            // intento decodificar el token
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            console.log("Verificando caducidad del token...");
            // si el token caduco
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });              
            }
            console.log("Token correcto!");
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