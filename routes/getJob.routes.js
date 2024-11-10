const express = require('express');
const getJobController = require('../controllers/getJob.controller');

const router = express.Router();

// router.get('/workana', getJobController.getWorkana);
// router.get('/soyfreelancer', getJobController.getSoyFreelancer);
router.get('/all', getJobController. getAllAds); //esta ruta trae todos los proyectos

module.exports = router;