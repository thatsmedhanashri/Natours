const fs = require('fs');
const Tour = require('./../models/tourModel');

// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id: ${val}`);
//   const id = req.params.id * 1;
//   const tour = tours.find((x) => x.id === id);
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Tour not found',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   console.log('checking request body...');
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Bad request',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   requestedTime: req.reqTime,
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });

  /* Using actual database */
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((x) => x.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });

  /* Using actual database */
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addTour = async (req, res) => {
  /* Using mock data */
  // We can get request body using middleware
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json(newTour);
  //   }
  // );

  /* Using actual database */
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      // message: 'Invalid data sent!',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((x) => x.id === id);
  // tour.duration = req.body.duration;
  // tours[id] = tour;
  // console.log(tours);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         tour,
  //       },
  //     });
  //   }
  // );

  /* Using actual database */
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  // Logic implementation to delete the tour from tour array
  // for (let i = 0; i < tours.length; i++) {}
  // res.status(200).json({
  //   status: 'success',
  //   data: null,
  // });

  /* Using actual database */
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
