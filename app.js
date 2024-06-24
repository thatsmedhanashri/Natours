const express = require('express');
const fs = require('fs');
const app = express();

// middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from the server side!');
//   res.status(200).json({ message: 'Hello from server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // We can get request body using middleware
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json(newTour);
    }
  );
});

// Responding to url parameters
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((x) => x.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((x) => x.id === id);

  if (tour) {
    tour.duration = req.body.duration;
    tours[id] = tour;
    console.log(tours);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(200).json({
          status: 'success',
          data: {
            tour,
          },
        });
      }
    );
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
});

app.delete('/api/v1/tours/:id', (req, res) => {
  // Logic implementation to delete the tour from tour array
  for (let i = 0; i < tours.length; i++) {}

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

app.listen(9090, () => {
  console.log('App is running on port 9090...');
});
