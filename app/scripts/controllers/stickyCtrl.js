'use strict';

angular.module('stickyApp', ['socket', 'util', 'ngAnimate'])
  .controller('stickyCtrl', ['$scope', 'socket', function($scope, socket) {
    $scope.stickies = [];

    $scope.addSticky = function() {
      var sticky = {id: '', left: 0, top: 0, text: '', color: '', showButton: false, init: true};
      $scope.stickies.push(sticky);
    };

    $scope.removeSticky = function(sticky) {
      var index= $scope.stickies.indexOf(sticky);
      var id = $scope.stickies[index].id;
      $scope.stickies.splice(index, 1);
      socket.emit('removeSticky', id);
    };

    $scope.changeColor = function(sticky, color) {
      var index = $scope.stickies.indexOf(sticky);
      $scope.stickies[index].color = color;
      socket.emit('changeColor', {'id': $scope.stickies[index].id, 'color': color});
    };

    $scope.hover = function(sticky) {
      sticky.showButton = !(sticky.showButton);
      return  sticky.showButton;
    };

    socket.on('connect', function() {
      var path = location.pathname;
      socket.emit('joinRoom', path);
    });

    socket.on('roomAccept', function() {
      socket.emit('initClient');
    });

    socket.on('initSticky', function(stickies) {
      for (var i in stickies) {
        $scope.stickies.push(
          {'id': stickies[i].id, 'left': stickies[i].left, 'top': stickies[i].top,
            'text': stickies[i].text, 'color': stickies[i].color, 'init': stickies[i].init});
      }
    });

    socket.on('createSticky', function(sticky) {
      $scope.stickies.push(
        {'id': sticky.id, 'left': sticky.left, 'top': sticky.top,
          'text': sticky.text, 'color': sticky.color, init: sticky.init});
    });

    socket.on('removeSticky', function(id) {
      for (var i = $scope.stickies.length; i--; ) {
        if ($scope.stickies[i].id === id) {
          $scope.stickies.splice(i, 1);
          break;
        }
      }
    });

    socket.on('changeColor', function(sticky) {
      for (var i = $scope.stickies.length; i--; ) {
        if ($scope.stickies[i].id === sticky.id) {
          $scope.stickies[i].color = sticky.color;
          break;
        }
      }
    });

    socket.on('editSticky', function(sticky) {
      for (var i = $scope.stickies.length; i--; ) {
        if ($scope.stickies[i].id === sticky.id) {
          $scope.stickies[i].text = sticky.text;
          break;
        }
      }
    });
  }]);
