'use strict';

var Sticky = (function() {
  function Sticky(id, left, top, text, color) {
    this.id = id;
    this.left = left;
    this.top = top;
    this.text = text;
    this.color = color;
    this.showButton = false;
  }
  return Sticky;
})();

angular.module('stickyApp', ['socket', 'util', 'ngAnimate'])
  .controller('stickyCtrl', ['$scope', 'socket', 'util', function($scope, socket, util) {
    $scope.stickies = [];

    /*jshint unused: vars */
    $scope.addSticky = function($event) {
      var id = util.generateId('sticky');
      var left = $('#add-button').offset().left + 40 + Math.round((Math.random() * 100));
      var top = $('#add-button').offset().top + 40 + Math.round((Math.random() * 100));
      var sticky = new Sticky(id, left, top, 'Double Click to Edit', '#FFFF99');

      $scope.stickies.push(sticky);
      socket.emit('createSticky', sticky);
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

    socket.on('connect', function(data) {
      var path = location.pathname;
      socket.emit('joinRoom', path);
    });

    socket.on('roomAccept', function() {
      socket.emit('initClient');
    });

    socket.on('initSticky', function(stickies) {
      for (var i in stickies) {
        $scope.stickies.push(
          new Sticky(
            stickies[i].id, stickies[i].left, stickies[i].top, stickies[i].text, stickies[i].color));
      }
    });

    socket.on('createSticky', function(sticky) {
      $scope.stickies.push(
        new Sticky(
          sticky.id, sticky.left, sticky.top, sticky.text, sticky.color));
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

    // socket.on('moveSticky', function(stickies) {
      // for (var i = stickies.length; i--; ) {
        // if ($scope.sticky.id === stickies[i].id) {
          // $(element).animate({
            // left: stickies[i].left,
            // top: stickies[i].top
          // }, 500);
          // $scope.sticky.left = stickies[i].left;
          // $scope.sticky.top = stickies[i].top;
          // break;
        // }
      // }
    // });
  }]);
