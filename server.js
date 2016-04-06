const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const imagesRouter = require(__dirname + '/routes/images_router');
// const userRouter = require(__dirname + '/routes/user_router');

mongoose.connect(process.env.MONGOLAB_URI
  || 'mongodb://localhost/images_app_dev');


app.use('/api', imagesRouter);
app.use(express.static(__dirname + '/build'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('server up at ' + PORT);});
