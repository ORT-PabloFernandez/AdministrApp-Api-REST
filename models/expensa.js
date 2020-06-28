'use strict';

const mongoose = require('mongoose');
const { Decimal128 } = require('mongodb');
const Schema = mongoose.Schema;

const ExpensaSchema = Schema({
    monto: Decimal128,
    descripcion: String,
    usuarios: []
});

module.exports = mongoose.model('Expensa', ExpensaSchema);