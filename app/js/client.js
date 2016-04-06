const angular = require('angular');
require('angular-ui-router');
const imageApp = angular.module('imageApp', ['ui.router']);

require(__dirname + '/image')(imageApp);


imageApp.config(['$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/fourohfour');
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'ImageController',
        templateUrl: '/views/home.html'
      });
  }
]);
