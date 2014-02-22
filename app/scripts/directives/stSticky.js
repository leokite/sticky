'use strict';
angular.module('StickyApp')
  .directive('stSticky', ['socket', function(socket) {
    return {
      // jshint unused: vars
      link: function(scope, element, attrs) {
        element.draggable({
          stack: ".sticky",
          containment: [0, 55, 2000, 2000]
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

        element.bind('dragstop', function(event, ui) {
          var stickies = [];
          var isSingleDrag = true;
          $('.ui-selected').each(function() {
            isSingleDrag = false;
            stickies.push({id: this.id, top: $(this).offset().top, left: $(this).offset().left});
            $(this).removeData('apos');
          });
          if (isSingleDrag === true) {
            stickies.push({id: scope.sticky.id, top: ui.position.top, left: ui.position.left});
          }
          scope.sticky.left = ui.position.left;
          scope.sticky.top = ui.position.top;
          scope.$apply();
          socket.emit('moveSticky', stickies);
        });

        function setPosition(left, top) {
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
              }, 500, null, setPosition(stickies[i].left, stickies[i].top));
              break;
            }
          }
        });

        element.bind('dblclick', function() {
          var text = scope.sticky.text;
          $(this).wrapInner(
            '<textarea id="text' + scope.sticky.id + '" class="content">' + text + '</textarea>').find('textarea').focus().select().blur(function() {
            $(this).parent().append($(this).children());
            $('#text' + scope.sticky.id).remove();
            scope.showButton = false; // for Firefox
            scope.sticky.text = $(this).val();
            scope.$apply();
            socket.emit('editSticky', {
              'id': scope.id,
              'text': scope.text
            });
          });
        });

      }
    };
  }]);
