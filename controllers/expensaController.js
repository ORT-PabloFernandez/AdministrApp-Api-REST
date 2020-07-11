'use strict';

const Expensa = require('../models/expensa');

function getExpensa(req, res) {    
    let expensaId = req.params.expensaId;
    console.log("getExpensa Id: " + expensaId);
    Expensa.findById(expensaId, (err, expensa) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!expensa) return res.status(404).send({message: `El extracto no existe`});
        console.log("Extracto expensas: " + expensa);
        res.status(200).send({ expensa: expensa });
    });
}

function getExpensas(req, res) {
    console.log("getExpensas");
    Expensa.find({}, (err, expensas) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!expensas) return res.status(404).send({message: `No existen extractos`});
        console.log("Expensas: " + expensas);
        res.status(200).send({ expensas: expensas });
    });
}

function saveExpensa(req, res) {
    let expensa = new Expensa();
    // los req.body.param son los parametros que se mandan en el body
    expensa.titulo = req.body.titulo;
    expensa.monto = req.body.monto;
    expensa.descripcion = req.body.descripcion;
    expensa.usuarios = req.body.usuarios;
    console.log("saveExpensa: " + expensa);
    expensa.save( (err) => {
        if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `});
        console.log("saveExpensa OK");
        res.status(200).send({message: 'El extracto fue guardado'});
    });
}

function updateExpensa(req, res) {
    let expensaId = req.params.expensaId;
    console.log("updateExpensa Id:" + expensaId);
    // los campos a actualizar se obtienen del body del mensaje
    let update = req.body;
    console.log("update campos: " + update);
    Expensa.findByIdAndUpdate(expensaId, update, (err, expensaUpdated) => {
        if (err) return res.status(500).send({message: `Error al actualizar el extracto: ${err}`});
        console.log("findByIdAndUpdate OK");
        res.status(200).send({ message: 'El extracto ha sido actualizado' });
    });
}

function deleteExpensa(req, res) {
    let expensaId = req.params.expensaId;
    console.log("deleteExpensa Id: " + expensaId);
    Expensa.findById(expensaId, (err, expensa) => {
        if (err) return res.status(500).send({message: `Error al borrar el extracto: ${err}`});
        if (!expensa) return res.status(404).send({message: `No existe el extracto`});
        expensa.remove(err => {
            if (err) return res.status(500).send({message: `Error al borrar el extracto: ${err}`});
            console.log("expensa remove OK");
            res.status(200).send({message: 'El extracto ha sido eliminado'});
        });
    });
}

module.exports = {
    getExpensa,
    getExpensas,
    saveExpensa,
    updateExpensa,
    deleteExpensa
}