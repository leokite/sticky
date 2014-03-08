'use strict';
angular.module('StickyApp', ['socket', 'util', 'ngAnimate'])
  .controller('StickiesCtrl', ['$scope', 'socket', 'util', function($scope, socket, util) {
    $scope.stickies = [];
    var initialized = false;

    $scope.add = function() {
      if (initialized) {
        var sticky = {
          id: util.generateId('sticky'),
          left: Math.round((Math.random() * 150)),
          top: 40 + Math.round((Math.random() * 150)),
          text: 'Double Click to Edit',
          color: 'yellowBackground',
          showButton: false
        };
        $scope.stickies.push(sticky);
        socket.emit('addSticky', sticky);
      }
    };

    $scope.remove = function(sticky) {
      var index= $scope.stickies.indexOf(sticky);
      var id = $scope.stickies[index].id;
      $scope.stickies.splice(index, 1);
      socket.emit('removeSticky', id);
    };

    $scope.clear = function() {
      for (var i = $scope.stickies.length; i--; ) {
        socket.emit('removeSticky', $scope.stickies[i].id);
      }
      $scope.stickies = [];
    };

    $scope.bundle = function() {
      if (initialized) {
        for (var i = $scope.stickies.length; i--; ) {
          $scope.stickies[i].left = 200;
          $scope.stickies[i].top = 200;
        }
        socket.emit('moveSticky', $scope.stickies);
      }
    };

    socket.on('connect', function() {
      var path = location.pathname;
      socket.emit('joinRoom', path);
    });

    socket.on('roomAccept', function() {
      socket.emit('initClient');
    });

    socket.on('initSticky', function(stickies) {
      $scope.stickies = [];
      for (var i in stickies) {
        $scope.stickies.push(
          {'id': stickies[i].id, 'left': stickies[i].left, 'top': stickies[i].top,
            'text': stickies[i].text, 'color': stickies[i].color, 'init': stickies[i].init});
      }
      initialized = true;
      unblockUI();
    });

    socket.on('addSticky', function(sticky) {
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

    socket.on('disconnect', function() {
      initialized = false;
      blockUI('Server disconnected. Refresh page to reconnect...');
    });

    $(function() {
      if (initialized === false) {
        // blockUI('Please wait...');
        blockUI('<img src="../images/loader.gif" width="36px" height="36px"/>');
      }
    });

    function blockUI(message) {
      $.blockUI({
        message: message,
        css: {
          border: 'none',
          padding: '15px',
          backgroundColor: '#ecf0f1',
          color: '#1abc9c'
        }
      });
    }

    function unblockUI() {
      $.unblockUI();
    }

  }]);
