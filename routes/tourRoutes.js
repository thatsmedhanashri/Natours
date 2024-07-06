const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// param middleware
// router.param('id', tourController.checkId);

router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours); // Aliasing

router.route('/').get(tourController.getAllTours).post(tourController.addTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
