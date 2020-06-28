'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensajeSchema = Schema({
    descripcion: String,
    usuarios: [],
    urgente: Boolean,
    tipo: {
        type: String,
        enum: [
            'aviso',
            'solicitud',
        ]
    }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);