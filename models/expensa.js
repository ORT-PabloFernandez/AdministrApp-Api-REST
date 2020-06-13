'use strict';

const mongoose = require('mongoose');
const { Double } = require('mongodb');
const Schema = mongoose.Schema;

const ExpensaSchema = Schema({
    monto: Double,
    descripcion: String,
    usuarios: [],
});

module.exports = mongoose.model('Expensa', ExpensaSchema);