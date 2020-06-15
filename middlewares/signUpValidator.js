'use strict';

function validarSignUp(req, res, next) {

    let nomApeMinLength = 2;
    let nombreUsuarioMinLength = 6;
    let error;

    console.log("Validando datos de usuario...");
    if (req.body.nombre.length < nomApeMinLength) {
        error = `Error: el nombre no puede tener menos de ${nomApeMinLength} caracteres`;
        console.log(error);
        return res.status(500).send({ 
            message: error 
        });
    }
    if (req.body.apellido.length < nomApeMinLength) {
        error = `Error: el apellido no puede tener menos de ${nomApeMinLength} caracteres`;
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }
    if (req.body.nombreUsuario.length < nombreUsuarioMinLength) {
        error = `Error: el nombre de usuario no puede tener menos de ${nombreUsuarioMinLength} caracteres`;
        console.log("Error al validar nombreUsuario!");
        return res.status(500).send({ 
            message: error
        });
    }
    if (!validarMail(req.body.email)) {
        error = "Error: Verifique el formato de su email"
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }
    if (!validarTelefono(req.body.telefono)) {
        error = "Error: El telefono debe tener 10 digitos"
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }
    if (!validarPassword(req.body.password)){
        error = "Verifique que su password tenga minimo 8 caracteres, con al menos una letra y un numero";
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }
    if (!validarCuit(req.body.cuit)) {
        error = "Verifique que su CUIT tenga 11 digitos";
        console.log(error);
        return res.status(500).send({ 
            message: error
        });
    }
    next();
}

function validarMail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function validarTelefono(tel) {
    const regex = /^\d{10}$/;
    return regex.test(String(tel));
}

function validarPassword(pass) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(String(pass));
}

function validarCuit(cuit) {
    const regex = /^\d{11}$/;
    return regex.test(cuit);
}

module.exports = validarSignUp;