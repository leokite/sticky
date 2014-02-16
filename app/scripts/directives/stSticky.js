'use strict';
angular.module('stickyApp')
  .directive('stSticky', ['socket', 'util', function(socket, util) {
    return {
      // jshint unused: vars
      link: function(scope, element, attrs) {
        if (scope.sticky.init === true) {
          scope.sticky.id  = util.generateId('sticky');
          scope.sticky.left = Math.round((Math.random() * 150));
          scope.sticky.top = $('#navbar-collapse').get(0).offsetHeight + 15 + Math.round((Math.random() * 150));
          scope.sticky.text = 'Double Click to Edit';
          scope.sticky.color = '#FFFF99';
          scope.sticky.showButton = false;
          scope.sticky.init = false;
          socket.emit('createSticky', scope.sticky);
        }

        element.draggable({
          stack: ".sticky",
          containment: [0, 55, 2000, 2000]
        });

        element.bind('dragstop', function(event, ui) {
          var stickies = [];
          var isMultipleSelect = false;
          $('.ui-selected').each(function() {
            isMultipleSelect = true;
            stickies.push({id: this.id, top: $(this).offset().top, left: $(this).offset().left});
            $(this).removeData('apos');
          });
          scope.sticky.left = ui.position.left;
          scope.sticky.top = ui.position.top;
          scope.$apply();
          if (isMultipleSelect === false) {
            stickies.push({id: scope.sticky.id, top: scope.sticky.top, left: scope.sticky.left});
          }
          socket.emit('moveSticky', stickies);
        });

        element.bind('dragstart', function(event, ui) {
          $('.ui-selected').each(function() {
            var apos = {
              top: ($(this).offset().top) - (ui.offset.top),
              left: ($(this).offset().left) - (ui.offset.left)
            };
            $(this).data('apos', apos);
          });
        });

        element.bind('drag', function(event, ui) {
          $('.ui-selected').each(function() {
            $(this).css({
              top: (ui.position.top) + $(this).data('apos').top,
              left: (ui.position.left) + $(this).data('apos').left
            });
          });
        });

        function delaySetPositionForChrome(left, top) {
          return function() {
            scope.sticky.left = left;
            scope.sticky.top = top;
            scope.$apply();
          };
        }

        socket.on('moveSticky', function(stickies) {
          for (var i = stickies.length; i--; ) {
            if (scope.sticky.id === stickies[i].id) {
              element.animate({
                left: stickies[i].left,
                top: stickies[i].top
              }, 500, null, delaySetPositionForChrome(stickies[i].left, stickies[i].top));
              break;
            }
          }
        });

        element.bind('dblclick', function() {
          var text = scope.sticky.text;
          $(this).wrapInner('<textarea class="content">' + text + '</textarea>').find('textarea').focus().select().blur(function() {
            $(this).parent().append($(this).children());
            $('textarea').remove();
            scope.sticky.text = $(this).val();
            scope.$apply();
            socket.emit('editSticky', {'id': scope.sticky.id, 'text': scope.sticky.text});
          });
        });
      }
    };
  }]);
