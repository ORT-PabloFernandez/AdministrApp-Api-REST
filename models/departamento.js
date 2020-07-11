'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartamentoSchema = Schema({
    titulo: String,
    descripcion: String,
    usuarios: []
});

module.exports = mongoose.model('Departamento', DepartamentoSchema);