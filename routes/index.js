'use strict';

const express = require('express');

const mensajeController = require('../controllers/mensajeController');
const usuarioController = require('../controllers/usuarioController');
const expensaController = require('../controllers/expensaController');
const departamentoController = require('../controllers/departamentoController');

const api = express.Router();

const auth = require('../middlewares/auth');
const validarSignUp = require('../middlewares/signUpValidator');
const validarPostMensaje = require('../middlewares/mensajePostValidator');
const validarPutMensaje = require('../middlewares/mensajePutValidator');
const validarPostExpensa = require('../middlewares/expensaPostValidator');
const validarPutExpensa = require('../middlewares/expensaPutValidator');
const validarPostDepartamento = require('../middlewares/departamentoPostValidator');
const validarPutDepartamento = require('../middlewares/departamentoPutValidator');
const accessControl = require('../middlewares/reactAppAuth');

// usuarios
api.post('/signup', accessControl, validarSignUp, usuarioController.signUp);
api.post('/login', accessControl, usuarioController.signIn);
// mensajes
api.get('/mensajes', accessControl, auth, mensajeController.getMensajes);
api.get('/mensaje/:mensajeId', accessControl, auth, mensajeController.getMensaje);
api.post('/mensaje', accessControl, auth, validarPostMensaje, mensajeController.saveMensaje);
api.put('/mensaje/:mensajeId', accessControl, auth, validarPutMensaje, mensajeController.updateMensaje);
api.delete('/mensaje/:mensajeId', accessControl, auth, mensajeController.deleteMensaje);
// expensas
api.get('/expensas', accessControl, auth, expensaController.getExpensas);
api.get('/expensa/:expensaId', accessControl, auth, expensaController.getExpensa);
api.post('/expensa', accessControl, auth, validarPostExpensa, expensaController.saveExpensa);
api.put('/expensa/:expensaId', accessControl, auth, validarPutExpensa, expensaController.updateExpensa);
api.delete('/expensa/:expensaId', accessControl, auth, expensaController.deleteExpensa);
// departamentos
api.get('/departamentos', accessControl, auth, departamentoController.getDepartamentos);
api.get('/departamento/:departamentoId', accessControl, auth, departamentoController.getDepartamento);
api.post('/departamento', accessControl, auth, validarPostDepartamento, departamentoController.saveDepartamento);
api.put('/departamento/:departamentoId', accessControl, auth, validarPutDepartamento, departamentoController.updateDepartamento);
api.delete('/departamento/:departamentoId', accessControl, auth, departamentoController.deleteDepartamento);

module.exports = api;