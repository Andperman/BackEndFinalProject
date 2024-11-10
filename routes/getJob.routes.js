const express = require('express');
const productsController = require('../controller/getJob');
const getJobController = require('../controllers/getJob.controller');

const router = express.Router();

router.get('/workana', getJobController.getWorkana);

module.exports = router;