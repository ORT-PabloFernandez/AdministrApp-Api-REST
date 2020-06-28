'use strict';

function validarPutExpensa(req, res, next) {
    let monto = req.body.monto;
    let descripcion = req.body.descripcion;
    let usuarios = req.body.usuarios;
    let descripcionMinLength = 5;
    let zero = 0;
    let error;

    // revisa que haya recibido un objeto en el request
    if (monto) {
        if (monto < zero) {
            error = `Error: el monto del extracto no puede ser menor a ${zero}`;
            console.log(error);
            return res.status(500).send({ 
                message: error 
            });
        }
    }

    if (descripcion) {
        if (descripcion.length < descripcionMinLength) {
            error = `Error: la descripcion del mensaje no puede tener menos de ${descripcionMinLength} caracteres`;
            console.log(error);
            return res.status(500).send({ 
                message: error 
            });
        }
    }
    if (usuarios) {
        if (usuarios.length == 0) {
            error = "Error: el mensaje debe tener al menos un usuario asignado";
            console.log(error);
            return res.status(500).send({ 
                message: error
            });
        }
    }

    next();
}

module.exports = validarPutExpensa;