'use strict';

describe('Controller: StickyCtrl', function () {
  var $scope, socket, createController;

  beforeEach(module('StickyApp'));

  beforeEach(inject(function($injector) {

    var $controller = $injector.get('$controller');
    var $rootScope = $injector.get('$rootScope');

    socket = $injector.get('socketMock');
    $scope = $rootScope.$new();

    createController = function() {
      return $controller('StickyCtrl', {
        '$scope': $scope,
        'socket': socket
      });
    };
  }));


  it('should emits and receives messages', function() {
    var testReceived = false;

    // jshint unused: vars
    socket.on('test', function(data) {
      testReceived = true;
    });

    socket.emit('test', {info: 'test'});
    expect(testReceived).toBe(true);
  });

  it('should change color', function() {
    createController();
    $scope.sticky = {'color': 'yellow', 'showButton': 'false'};
    $scope.changeColor('green');
    expect($scope.sticky.color).toBe('green');
  });

});
