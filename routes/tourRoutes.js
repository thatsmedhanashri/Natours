const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// param middleware
router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addTour); // Chaining multiple middleware functions
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
