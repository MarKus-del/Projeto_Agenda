const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const testeController = require('./src/controllers/testeController');

routes.get('/', homeController.paginaInicial);
routes.post('/', homeController.trataPost);
routes.get('/teste/:idUsuario?', testeController.teste);

module.exports = routes;