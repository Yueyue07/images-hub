const express = require('express');
const jsonParser = require('body-parser').json();
const Image = require(__dirname + '/../models/image');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var imageRouter = module.exports = exports = express.Router();

imageRouter.get('/images', (req, res) => {
  Image.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

imageRouter.post('/images', jsonParser, (req, res) => {
  var newImage = new Image(req.body);
  newImage.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

imageRouter.put('/images/:id', jsonParser, (req, res) => {
  var imageData = req.body;
  delete imageData._id;
  Image.update({ _id: req.params.id }, imageData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

imageRouter.delete('/images/:id', (req, res) => {
  Image.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'success' });
  });
});
