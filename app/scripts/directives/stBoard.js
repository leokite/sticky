'use strict';
angular.module('stickyApp')
  .directive('stBoard', [function() {
    // jshint unused: vars
    return {
      link: function(scope, element, attrs) {
        element.selectable({
          stop: function(event) {
            $(':focus').blur();
          },
          filter: '.sticky',
          unselected: function(event, ui) {
            for (var i = scope.stickies.length; i--; ) {
              scope.stickies[i].left =
                $('#' + scope.stickies[i].id).offset().left;
              scope.stickies[i].top =
                $('#' + scope.stickies[i].id).offset().top;
            }
            scope.$apply();
          }
        });
      }
    };
  }]);
