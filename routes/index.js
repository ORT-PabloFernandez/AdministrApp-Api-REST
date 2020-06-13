'use strict';

const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();
const auth = require('../middlewares/auth');

api.get('/mensaje', mensajeController.getMensajes);
api.get('/mensaje/:mensajeId', mensajeController.getMensaje);
api.post('/mensaje', mensajeController.saveMensaje);
api.put('/mensaje/:mensajeId', auth, mensajeController.updateMensaje);
api.delete('/mensaje/:mensajeId', auth, mensajeController.deleteMensaje);
api.post('/signup', usuarioController.signUp);
api.post('/login', auth, usuarioController.signIn);

module.exports = api;