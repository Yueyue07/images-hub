var angular = require('angular');


describe('movies controller',() => {
  beforeEach(angular.mock.module('imageApp'));
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));
  it('should be able to make a controller', function() {
    var ImageController = $ControllerConstructor('ImageController', {
      $scope });

    expect(typeof ImageController).toBe('object');
    expect(angular.isArray($scope.images)).toBe(true);
    expect($scope.images.length).toBe(0);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST request', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ImageController',{
        $scope
      });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/images', () => {
      $httpBackend.expectGET('http://localhost:3000/api/images').respond(200, [{
        name: 'test'
      }]);

      $scope.getAll();
      $httpBackend.flush();

      expect($scope.images.length).toBe(1);
      expect($scope.images[0].name).toBe('test');
    });

    it('should create a new image', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/images',
        { name: 'postimage' })
          .respond(200, { name: 'responsenewimage' });
      $scope.newimage = { name: 'newimage' };
      $scope.create({ name: 'postimage' });
      $httpBackend.flush();
      expect($scope.images.length).toBe(1);
      expect($scope.images[0].name).toBe('responsenewimage');
      expect($scope.newimage).toBe(null);

    });

  });
});
