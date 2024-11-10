const express = require('express');
const getJobController = require('../controller/getJob.controller');

const router = express.Router();

router.get('/workana',getJobController.getWorkana);

module.exports = router;