const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json()); // middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/dev-data`));

// app.use((req, res, next) => {
//   req.reqTime = new Date().toISOString();
//   next();
// });

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling unhandled routes
// It should be the last route
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail';
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// When we pass 4 parameters as below in app.use(), express knows that it is a error handling function
// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500; // By default, setting it to 500 - internal server error
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
//   next();
// })
app.use(GlobalErrorHandler);

module.exports = app;
