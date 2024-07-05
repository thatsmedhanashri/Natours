const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

mongoose
  .connect(
    'mongodb+srv://Dhanashri:Dhanu%402802@atlascluster.pli1x0n.mongodb.net/natours?retryWrites=true&w=majority&appName=AtlasCluster'
  )
  .then(() => {
    console.log('DB connection successful!');
  });

const insertData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data added successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--insert') {
  insertData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
