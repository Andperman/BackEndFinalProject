const express = require('express');
// Rutas de vistas
const viewsController = require("../controllers/views.controller");
const router = express.Router();


router.get('/', viewsController.getHome);
router.get('/profile', viewsController.getProfile);
router.get('/favorites', viewsController.getFavorites);
router.get('/users', viewsController.getUsersView);
router.get('/dashboard', viewsController.getDashboard);

// Formulario de búsqueda de ofertas de trabajo situado en Home
router.post('/', viewsController.searchJobOffers);

module.exports = router;