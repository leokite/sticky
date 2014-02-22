'use strict';

angular.module('StickyApp')
  .controller('StickyCtrl', ['$scope','socket', function($scope, socket) {

    $scope.changeColor = function(color) {
      $scope.sticky.color = color;
      socket.emit('changeColor', {'id': $scope.sticky.id, 'color': color});
    };

    $scope.hover = function() {
      $scope.sticky.showButton = !($scope.sticky.showButton);
      return $scope.sticky.showButton;
    };

  }]);
