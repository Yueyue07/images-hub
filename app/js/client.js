const angular = require('angular');
require('angular-route');
const imageApp = angular.module('imageApp', ['ngRoute']);

require(__dirname + '/image')(imageApp);


imageApp.config(['$routeProvider', function(routes) {
  routes
    .when('/', {
      controller: 'ImageController',
      templateUrl: '/views/home.html'
    })
    .when('/home', {
      controller: 'ImageController',
      templateUrl: '/views/home.html'
    }).otherwise({
      templateUrl: '/views/nofound.html'
    });
}]);
