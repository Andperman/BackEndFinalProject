const express = require('express');
const getJobController = require('../controller/getJob.controller');

const router = express.Router();

router.get('/workana',getJobController.getWorkana);
router.get('/soyfreelancer', productsController.getSoyFreelancer);
router.get('/all', productsController. getAllAds);

module.exports = router;