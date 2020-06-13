'use strict';

const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();
const auth = require('../middlewares/auth');

api.post('/signup', usuarioController.signUp);
api.post('/login', auth, usuarioController.signIn);
api.get('/mensaje', auth, mensajeController.getMensajes);
api.get('/mensaje/:mensajeId', auth, mensajeController.getMensaje);
api.post('/mensaje', auth, mensajeController.saveMensaje);
api.put('/mensaje/:mensajeId', auth, mensajeController.updateMensaje);
api.delete('/mensaje/:mensajeId', auth, mensajeController.deleteMensaje);

module.exports = api;