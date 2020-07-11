'use strict';

const Departamento = require('../models/departamento');

function getDepartamento(req, res) {    
    let departamentoId = req.params.departamentoId;
    console.log("getDepartamento Id: " + departamentoId);
    Departamento.findById(departamentoId, (err, departamento) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!departamento) return res.status(404).send({message: `El departamento no existe`});
        console.log("Departamento: " + departamento);
        res.status(200).send({ departamento: departamento });
    });
}

function getDepartamentos(req, res) {
    console.log("getDepartamentos");
    Departamento.find({}, (err, departamentos) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!departamentos) return res.status(404).send({message: `No existen departamentos`});
        console.log("Departamentos: " + departamentos);
        res.status(200).send({ departamentos: departamentos });
    });
}

function saveDepartamento(req, res) {
    let departamento = new Departamento();
    // los req.body.param son los parametros que se mandan en el body
    departamento.titulo = req.body.titulo;
    departamento.descripcion = req.body.descripcion;
    departamento.usuarios = req.body.usuarios;
    console.log("saveDepartamento: " + departamento);
    departamento.save( (err) => {
        if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `});
        console.log("saveDepartamento OK");
        res.status(200).send({message: 'El departamento fue guardado'});
    });
}

function updateDepartamento(req, res) {
    let departamentoId = req.params.departamentoId;
    console.log("updateDepartamento Id:" + departamentoId);
    // los campos a actualizar se obtienen del body del mensaje
    let update = req.body;
    console.log("update campos: " + update);
    Departamento.findByIdAndUpdate(departamentoId, update, (err, departamentoUpdated) => {
        if (err) return res.status(500).send({message: `Error al actualizar el departamento: ${err}`});
        console.log("findByIdAndUpdate OK");
        res.status(200).send({ message: 'El departamento ha sido actualizado' });
    });
}

function deleteDepartamento(req, res) {
    let departamentoId = req.params.departamentoId;
    console.log("deleteDepartamento Id: " + departamentoId);
    Departamento.findById(departamentoId, (err, departamento) => {
        if (err) return res.status(500).send({message: `Error al borrar el departamento: ${err}`});
        if (!departamento) return res.status(404).send({message: `No existe el departamento`});
        departamento.remove(err => {
            if (err) return res.status(500).send({message: `Error al borrar el departamento: ${err}`});
            console.log("departamento remove OK");
            res.status(200).send({message: 'El departamento ha sido eliminado'});
        });
    });
}

module.exports = {
    getDepartamento,
    getDepartamentos,
    saveDepartamento,
    updateDepartamento,
    deleteDepartamento
}