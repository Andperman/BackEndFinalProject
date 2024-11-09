const jobOffersController = require('../controllers/jobOffers.controller');
const router = require('express').Router();

router.get("/:id?", jobOffersController.getAllJobOffers);
router.post("/", jobOffersController.createJobOffer);
router.put("/:id", jobOffersController.updateJobOffer);
router.delete("/:id", jobOffersController.deleteJobOffer);

module.exports = router;