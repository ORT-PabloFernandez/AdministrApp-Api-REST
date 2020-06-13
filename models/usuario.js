'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    email: { type: String, unique: true, lowercase: true },
    telefono: String,
    nombreUsuario: String,
    password: { type: String, select: false },
    mensajes: [],
    cuit: String,
    tipo: {
        type: String,
        enum: [
            'administracion',
            'propietario',
            'inquilino',
            'encargado'
        ]
    }
});

UsuarioSchema.pre('save', function(next) {
    let usuario = this;
    // si no se modifico el password pasa al siguiente middleware
    if (!usuario.isModified('password')) return next();

    // generar salt para encriptar password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next();

        // encriptar password
        bcrypt.hash(usuario.password, salt, (err, hash) => {
            if (err) return next(err);

            usuario.password = hash;
            next();
        });
    })
});

UsuarioSchema.methods.gravatar = function() {
    if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro';

    const md5 = crypto.createHash('md5').update(this.mail).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200$d=retro`;

}

module.exports = mongoose.model('Usuario', UsuarioSchema);