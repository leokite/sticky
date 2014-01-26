'use strict';

angular.module('util', [])
  .factory('util', [function() {
    return {
      generateId: function(prefix) {
        return prefix +
          String(new Date().getTime()) +
          String(Math.round(Math.random() * 100));
      }
    };
  }]);
