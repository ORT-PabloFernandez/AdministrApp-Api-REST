'use strict';

const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();
const auth = require('../middlewares/auth');
const validarSignUp = require('../middlewares/signUpValidator');
const validarPostMensaje = require('../middlewares/mensajePostValidator');
const validarPutMensaje = require('../middlewares/mensajePutValidator');

api.post('/signup', validarSignUp, usuarioController.signUp);
api.post('/login', usuarioController.signIn);
api.get('/mensaje', auth, mensajeController.getMensajes);
api.get('/mensaje/:mensajeId', auth, mensajeController.getMensaje);
api.post('/mensaje', auth, validarPostMensaje, mensajeController.saveMensaje);
api.put('/mensaje/:mensajeId', auth, validarPutMensaje, mensajeController.updateMensaje);
api.delete('/mensaje/:mensajeId', auth, mensajeController.deleteMensaje);

module.exports = api;