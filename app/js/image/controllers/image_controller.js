module.exports = function(app) {
  app.controller('ImageController', ['$scope', '$http', 'Resource',
  function($scope, $http, Resource) {
    $scope.images = [];
    var imageResource = Resource('/images');

    $scope.getAll = function() {
      imageResource.getAll(function(err, res) {
        if(err) return console.log(err);
        $scope.images = res;
      });
    };

    $scope.create = function(image) {
      imageResource.create(image, function(err, res) {
        if(err) return console.log(err);
        $scope.images.push(res);
        $scope.newimage = null;
      });
    };


    $scope.updateimage = function(image) {
      imageResource.update(image, function(err,res) {
        image.backup = null;
        if(err) return console.log(err);
        $scope.images = $scope.images.map(function(item) {
          if(item._id === image._id){
            item = image;
            return item;
          }
          return item;
        });
        image.editing = false;
      });
    };

    $scope.deleteimage =  function(image) {
      imageResource.delete(image, function (err, res) {
        if(err) return console.log(err);
        $scope.images = $scope.images.filter((item) => item._id !== image._id);
      });
    };
  }]);
};
