'use strict';
angular.module('stickyApp')
  .directive('stEditable', ['socket', function(socket) {
    return {
    // jshint unused: vars
      link: function($scope, element, attrs) {
        $(element).bind('dblclick', function() {
          var text = $scope.sticky.text;
          $(this).wrapInner('<textarea class="content">' + text + '</textarea>').find('textarea').focus().select().blur(function() {
            $(this).parent().append($(this).children());
            $('textarea').remove();
            $scope.sticky.text = $(this).val();
            $scope.$apply();
            socket.emit('editSticky', {'id': $scope.sticky.id, 'text': $scope.sticky.text});
          });
        });
      }
    };
  }]);
