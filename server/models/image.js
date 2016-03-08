const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  name: { type: String, default: 'Image' },
  url: String,
  description: String,
  date: String
});

var Image = module.exports = exports = mongoose.model('Image', imageSchema);
