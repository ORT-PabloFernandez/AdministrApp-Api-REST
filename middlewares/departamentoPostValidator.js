'use strict';

function validarPostDepartamento(req, res, next) {
    let descripcion = req.body.descripcion;
    let usuarios = req.body.usuarios;
    let descripcionMinLength = 5;
    let error;

    if (descripcion.length < descripcionMinLength) {
        error = `Error: la descripcion del departamento no puede tener menos de ${descripcionMinLength} caracteres`;
        console.log(error);
        return res.status(500).send({ 
            message: error 
        });
    }

    if (usuarios.length == 0) {
        error = "Error: el departamento debe tener al menos un usuario asignado";
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }

    next();
}

module.exports = validarPostDepartamento;

