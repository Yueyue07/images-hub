module.exports = exports = function(app) {
  require('./services/resource_service')(app);
  require('./controllers/image_controller')(app);
};
