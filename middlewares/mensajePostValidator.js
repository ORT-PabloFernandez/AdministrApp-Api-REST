'use strict';

function validarPostMensaje(req, res, next) {
    let descripcion = req.body.descripcion;
    let usuarios = req.body.usuarios;
    let urgente = req.body.urgente;
    let descripcionMinLength = 5;
    let error;

    if (descripcion.length < descripcionMinLength) {
        error = `Error: la descripcion del mensaje no puede tener menos de ${descripcionMinLength} caracteres`;
        console.log(error);
        return res.status(500).send({ 
            message: error 
        });
    }

    if (usuarios.length == 0) {
        error = "Error: el mensaje debe tener al menos un usuario asignado";
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }

    if (typeof urgente != 'boolean') {
        error = "Error: se debe ingresar si el mensaje es urgente o no";
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }

    next();
}

module.exports = validarPostMensaje;

