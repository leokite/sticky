'use strict';

describe('Unit: Testing StickyCtrl', function () {
  var $scope, socket, createController;

  beforeEach(module('StickyApp'));

  beforeEach(inject(function($injector, $rootScope, $controller) {
    socket = $injector.get('socketMock');
    $scope = $rootScope.$new();

    createController = function() {
      return $controller('StickyCtrl', {
        '$scope': $scope,
        'socket': socket
      });
    };
  }));

  it('should change color', function() {
    createController();
    $scope.sticky = {color: 'yellow'};
    $scope.changeColor('green');
    expect($scope.sticky.color).toBe('green');
  });

  it('should change showButton flag in case of hover', function() {
    createController();
    $scope.sticky = {showButton: false};
    $scope.hover();
    expect($scope.sticky.showButton).toBe(true);
  });

  // it('should emits and receives messages', function() {
    // var testReceived = false;

    // socket.on('test', function() {
      // testReceived = true;
    // });

    // socket.emit('test', {info: 'test'});
    // expect(testReceived).toBe(true);
  // });

});
