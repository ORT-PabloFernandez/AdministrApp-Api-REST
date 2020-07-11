'use strict';

const Mensaje = require('../models/mensaje');

function getMensaje(req, res) {    
    let mensajeId = req.params.mensajeId;
    console.log("getMensaje Id: " + mensajeId);
    Mensaje.findById(mensajeId, (err, mensaje) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!mensaje) return res.status(404).send({message: `El mensaje no existe`});
        // en ECMAScript 6 en el caso de objetos con clave y valor igual se puede escribir { mensaje } directamente
        console.log("Mensaje: " + mensaje);
        res.status(200).send({ mensaje: mensaje });
    });
}

function getMensajes(req, res) {
    console.log("getMensajes");
    Mensaje.find({}, (err, mensajes) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!mensajes) return res.status(404).send({message: `No existen mensajes`});
        console.log("Mensajes: " + mensajes);
        res.status(200).send({ mensajes: mensajes });
    });
}

function saveMensaje(req, res) {
    let mensaje = new Mensaje();
    // los req.body.param son los parametros que se mandan en el body
    mensaje.titulo = req.body.titulo;
    mensaje.descripcion = req.body.descripcion;
    mensaje.usuarios = req.body.usuarios;
    mensaje.tipo = req.body.tipo;
    mensaje.urgente = req.body.urgente;
    console.log("saveMensaje: " + mensaje);
    mensaje.save( (err) => {
        if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `});
        console.log("saveMensaje OK");
        res.status(200).send({message: 'El mensaje fue guardado'});
    });
}

function updateMensaje(req, res) {
    let mensajeId = req.params.mensajeId;
    console.log("updateMensaje Id:" + mensajeId);
    // los campos a actualizar se obtienen del body del mensaje
    let update = req.body;
    console.log("update campos: " + update);
    Mensaje.findByIdAndUpdate(mensajeId, update, (err, mensajeUpdated) => {
        if (err) return res.status(500).send({message: `Error al actualizar el mensaje: ${err}`});
        console.log("findByIdAndUpdate OK");
        res.status(200).send({ message: 'El mensaje ha sido actualizado' });
    });
}

function deleteMensaje(req, res) {
    let mensajeId = req.params.mensajeId;
    console.log("deleteMensaje Id: " + mensajeId);
    Mensaje.findById(mensajeId, (err, mensaje) => {
        if (err) return res.status(500).send({message: `Error al borrar el mensaje: ${err}`});
        if (!mensaje) return res.status(404).send({message: `No existe el mensaje`});
        mensaje.remove(err => {
            if (err) return res.status(500).send({message: `Error al borrar el mensaje: ${err}`});
            console.log("mensaje remove OK");
            res.status(200).send({message: 'El mensaje ha sido eliminado'});
        });
    });
}

module.exports = {
    getMensaje,
    getMensajes,
    saveMensaje,
    updateMensaje,
    deleteMensaje
}