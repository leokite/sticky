'use strict';

angular.module('stickyApp', ['socket', 'util', 'ngAnimate'])
  .controller('stickyCtrl', ['$scope', 'socket', 'util', function($scope, socket, util) {
    $scope.stickies = [];

    $scope.addSticky = function() {
      var sticky = {
        id: util.generateId('sticky'),
        left: Math.round((Math.random() * 150)),
        top: 40 + Math.round((Math.random() * 150)),
        text: 'Double Click to Edit',
        color: 'yellowBackground',
        showButton: false
      };
      $scope.stickies.push(sticky);
      socket.emit('createSticky', sticky);
    };

    $scope.removeSticky = function(sticky) {
      var index= $scope.stickies.indexOf(sticky);
      var id = $scope.stickies[index].id;
      $scope.stickies.splice(index, 1);
      socket.emit('removeSticky', id);
    };

    $scope.changeColorGreen = function(sticky) {
      var index = $scope.stickies.indexOf(sticky);
      var color = 'greenBackground';
      $scope.stickies[index].color = color;
      socket.emit('changeColor', {'id': $scope.stickies[index].id, 'color': color});
    };

    $scope.changeColorYellow = function(sticky) {
      var index = $scope.stickies.indexOf(sticky);
      var color = 'yellowBackground';
      $scope.stickies[index].color = color;
      socket.emit('changeColor', {'id': $scope.stickies[index].id, 'color': color});
    };

    $scope.changeColorPink = function(sticky) {
      var index = $scope.stickies.indexOf(sticky);
      var color = 'pinkBackground';
      $scope.stickies[index].color = color;
      socket.emit('changeColor', {'id': $scope.stickies[index].id, 'color': color});
    };

    $scope.setText = function(sticky, text) {
      var index = $scope.stickies.indexOf(sticky);
      $scope.stickies[index].text = text;
      $scope.stickies[index].showButton = false; // for Firefox
      $scope.$apply();
      socket.emit('editSticky', {'id': $scope.stickies[index].id, 'text': $scope.stickies[index].text});
    };

    $scope.setPositions = function(stickies) {
      for (var i = stickies.length; i--; ) {
        for (var j = $scope.stickies.length; j--; ) {
          if (stickies[i].id === $scope.stickies[j].id) {
            $scope.stickies[j].left = stickies[i].left;
            $scope.stickies[j].top = stickies[i].top;
          }
        }
      }
      $scope.$apply();
      socket.emit('moveSticky', stickies);
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
