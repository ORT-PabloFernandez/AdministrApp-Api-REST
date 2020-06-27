'use strict';

const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const usuarioController = require('../controllers/usuarioController');
const api = express.Router();
const auth = require('../middlewares/auth');
const validarSignUp = require('../middlewares/signUpValidator');
const validarPostMensaje = require('../middlewares/mensajePostValidator');
const validarPutMensaje = require('../middlewares/mensajePutValidator');
const accessControl = require('../middlewares/reactAppAuth');

api.post('/signup', accessControl, validarSignUp, usuarioController.signUp);
api.post('/login', accessControl, usuarioController.signIn);
api.get('/mensaje', accessControl, auth, mensajeController.getMensajes);
api.get('/mensaje/:mensajeId', accessControl, auth, mensajeController.getMensaje);
api.post('/mensaje', accessControl, auth, validarPostMensaje, mensajeController.saveMensaje);
api.put('/mensaje/:mensajeId', accessControl, auth, validarPutMensaje, mensajeController.updateMensaje);
api.delete('/mensaje/:mensajeId', accessControl, auth, mensajeController.deleteMensaje);

module.exports = api;