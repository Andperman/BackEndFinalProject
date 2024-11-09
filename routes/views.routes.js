const express = require('express');
// Rutas de productos
const viewsController = require("../controllers/views.controller");
const router = express.Router();

router.get('/', viewsController.getHome);
// router.get('/signup',viewsController.a);
// router.post('/login', viewsController.a);
// router.post('/favorites', viewsController.a);
// router.post('/profile', viewsController.a);
// router.post('/users', viewsController.a);
// router.post('/dashboard', viewsController.a);

module.exports = router;