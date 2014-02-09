'use strict';
angular.module('stickyApp')
  .directive('stDraggable', ['socket', function(socket) {
    return {
    // jshint unused: vars
      link: function($scope, element, attrs) {
        $(element).animate({
          left: $scope.sticky.left,
          top: $scope.sticky.top
        }, 500);

        $(element).draggable({
          stack: ".sticky"
        });

        socket.on('moveSticky', function(stickies) {
          for (var i = stickies.length; i--; ) {
            if ($scope.sticky.id === stickies[i].id) {
              $(element).animate({
                left: stickies[i].left,
                top: stickies[i].top
              }, 500);
              $scope.sticky.left = stickies[i].left;
              $scope.sticky.top = stickies[i].top;
              break;
            }
          }
        });

        $(element).bind('dragstop', function(event, ui) {
          var stickies = [];
          var isMultipleSelect = false;
          $('.ui-selected').each(function() {
            isMultipleSelect = true;
            stickies.push({id: this.id, top: $(this).offset().top, left: $(this).offset().left});
            $(this).removeData('apos');
          });
          $scope.sticky.left = ui.position.left;
          $scope.sticky.top = ui.position.top;
          $scope.$apply();
          if (isMultipleSelect === false) {
            stickies.push({id: $scope.sticky.id, top: $scope.sticky.top, left: $scope.sticky.left});
          }
          socket.emit('moveSticky', stickies);
        });

        $(element).bind('dragstart', function(event, ui) {
          $('.ui-selected').each(function() {
            var apos = {
              top: ($(this).offset().top) - (ui.offset.top),
              left: ($(this).offset().left) - (ui.offset.left)
            };
            $(this).data('apos', apos);
          });
        });

        $(element).bind('drag', function(event, ui) {
          $('.ui-selected').each(function() {
            $(this).css({
              top: (ui.position.top) + $(this).data('apos').top,
              left: (ui.position.left) + $(this).data('apos').left
            });
          });
        });
      }
    };
  }]);
