var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  };
};

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(ResourceName) {
      this.ResourceName = ResourceName;
    };
    Resource.prototype.getAll = function(callback) {
      $http.get('http://localhost:3000/api' + this.ResourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http.post('http://localhost:3000/api' + this.ResourceName, data)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http.put('http://localhost:3000/api' + this.ResourceName
        + '/' + data._id, data)
          .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http.delete('http://localhost:3000/api' + this.ResourceName
        + '/' + data._id)
          .then(handleSuccess(callback), handleFailure(callback));
    };
    return function(resourceName) {
        return new Resource(resourceName);
    };
  }]);
};
