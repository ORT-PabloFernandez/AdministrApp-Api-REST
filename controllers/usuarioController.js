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
        return res.status(200).send({
            id: usuario._id,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            nombreUsuario: req.body.nombreUsuario,
            cuit: req.body.cuit,
            tipo: req.body.tipo,
            token: service.createToken(usuario)
        });
    });
}

function signIn(req, res) {
    console.log("SignIn usuario...");
    Usuario.findOne({ email: req.body.email }, (err, usuario) => {
        console.log("Usuario: \n" + usuario);
        if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` });
        if (!usuario) return res.status(404).send({ message: `Error el usuario no existe: ${req.body.email}` });
        console.log("Verificando password para usuario: " + req.body.email);
        return usuario.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` });
            if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.email}` });
            console.log("Verificacion de password OK");
            req.usuario = usuario;
            return res.status(200).send({
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                telefono: usuario.telefono,
                nombreUsuario: usuario.nombreUsuario,
                cuit: usuario.cuit,
                tipo: usuario.tipo,
                token: service.createToken(usuario)
            });
        });
    }).select('_id nombre apellido email telefono nombreUsuario cuit tipo +password');
}

function updateUsuario(req, res) {
    let userId = req.params.userId;
    console.log("getUsuario Id: " + userId);
    Usuario.findById(userId, (err, usuario) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` });
        if (!usuario) return res.status(404).send({ message: `El usuario no existe` });
        console.log("Usuario: " + JSON.stringify(usuario));
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.telefono = req.body.telefono;
        usuario.nombreUsuario = req.body.nombreUsuario;
        usuario.password = req.body.password;
        usuario.cuit = req.body.cuit;
        usuario.tipo = req.body.tipo;
        console.log("Modificando usuario: " + usuario.email);
        usuario.save((err) => {
            if (err) return res.status(500).send({ message: `Error al modificar el usuario: ${err}` });
            return res.status(200).send({
                id: usuario._id,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                nombreUsuario: req.body.nombreUsuario,
                cuit: req.body.cuit,
                tipo: req.body.tipo
            });
        });
    });
}

function deleteUsuario(req, res) {
    let userId = req.params.userId;
    console.log("deleteUsuario Id: " + userId);
    Usuario.findById(userId, (err, usuario) => {
        if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` });
        if (!usuario) return res.status(404).send({ message: `No existe el usuario` });
        usuario.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` });
            console.log("usuario remove OK");
            res.status(200).send({ message: 'El usuario ha sido eliminado' });
        });
    });
}

module.exports = {
    signUp,
    signIn,
    updateUsuario,
    deleteUsuario
}



