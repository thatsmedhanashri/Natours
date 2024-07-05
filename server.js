const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

// mongoose.connect(process.env.DATABASE_LOCAL).then((con) => {
//   console.log(con);
//   console.log('DB connection successful!');
// });

mongoose
  .connect(
    'mongodb+srv://Dhanashri:Dhanu%402802@atlascluster.pli1x0n.mongodb.net/natours?retryWrites=true&w=majority&appName=AtlasCluster'
  )
  .then((con) => {
    // console.log(con);
    console.log('DB connection successful!');
  });

const port = process.env.PORT;
console.log('port - ', port);
app.listen(9090, () => {
  console.log(`App is running on port ${port}...`);
});
