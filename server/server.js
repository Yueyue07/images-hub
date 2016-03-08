const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const imagesRouter = require(__dirname + '/routes/images_router');
// const userRouter = require(__dirname + '/routes/user_router');

mongoose.connect(process.env.MONGOLAB_URI
  || 'mongodb://localhost/images_app_dev');


app.use((req, res, next) => {
  res.header('Access-Controller-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Controller-Allow-Headers',
    'Content-Type, Authorization, token');
  res.header('Access-Controller-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', imagesRouter);

// app.use('/api', userRouter);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('server up at ' + PORT);});
