'use strict';

const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const service = require('../services');

function signUp(req, res) {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        nombreUsuario: req.body.nombreUsuario,
        password: req.body.password,
        cuit: req.body.cuit,
        tipo: req.body.tipo
    });
    console.log("Creando usuario...");
    usuario.save( (err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}`});
        console.log("Llamando createToken...");
        return res.status(200).send({ token: service.createToken(usuario)});
    });
}

function signIn(req, res) {
    Usuario.find({ email: req.body.email }, (err, usuario) => {
        if (err) return res.status(500).send({ message: `Error en el signIn: ${err}`});
        if (!usuario) return res.status(404).send({ message: 'El usuario no existe'});

        req.usuario = usuario;
        res.status(200).send({ 
            message: 'Logueado correctamente',
            token: service.createToken(usuario)
        });
    });
}

module.exports = {
    signUp,
    signIn
}



