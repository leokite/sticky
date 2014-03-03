'use strict';

module.exports = function(io) {
  io.configure('production', function() {
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.enable('browser client gzip');
    io.set('log level', 1);
    io.set('transports', [
      // 'websocket',
      //'flashsocket',
      //'htmlfile',
      'xhr-polling'
      //'jsonp-polling'
    ]);
    io.set('polling duration', 10);
  });
};
