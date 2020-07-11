'use strict';

function validarPostExpensa(req, res, next) {
    let titulo = req.body.titulo;
    let monto = req.body.monto;
    let descripcion = req.body.descripcion;
    let usuarios = req.body.usuarios;
    let descripcionMinLength = 5;
    let tituloMinLength = 5;
    let zero = 0;
    let error;

    if (titulo.length < tituloMinLength) {
        error = `Error: el titulo del extracto no puede tener menos de ${tituloMinLength} caracteres`;
        console.log(error);
        return res.status(500).send({ 
            message: error 
        });
    }

    if (monto < zero) {
        error = `Error: el monto del extracto no puede ser menor a ${zero}`;
        console.log(error);
        return res.status(500).send({ 
            message: error 
        });
    }

    if (descripcion.length < descripcionMinLength) {
        error = `Error: la descripcion del extracto no puede tener menos de ${descripcionMinLength} caracteres`;
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

    next();
}

module.exports = validarPostExpensa;

