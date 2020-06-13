'use strict';

const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const service = require('../services');

function signUp(req, res) {
    console.log("Signup usuario...");
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
    console.log("Creando usuario: " + usuario.email);
    usuario.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` });
        console.log("Llamando servicio de creacion de token...");
        return res.status(200).send({ token: service.createToken(usuario) });
    });
}

function signIn(req, res) {
    console.log("SignIn usuario...");
    Usuario.findOne({ email: req.body.email }, (err, usuario) => {
        if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` });
        if (!usuario) return res.status(404).send({ message: `Error el usuario no existe: ${req.body.email}` });
        console.log("Verificando password para usuario: " + req.body.email);
        return usuario.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` });
            if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.email}` });
            console.log("Verificacion de password OK");
            req.usuario = usuario;
            return res.status(200).send({
                message: 'Te has logueado correctamente', 
                token: service.createToken(usuario)
            });
        });
    }).select('_id email +password');
}

module.exports = {
    signUp,
    signIn
}



