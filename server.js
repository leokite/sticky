'use strict';

// Module dependencies.
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var socket = require('./lib/controllers/socket');

// Configuration
require('./lib/config/express')(app);
require('./lib/config/io')(io);

// Controllers
var index = require('./lib/controllers/index');

// Server Routes
app.get('/*', index.index);
// Start server
var port = process.env.PORT || 3000;
server = server.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

io.sockets.on('connection', socket);

// Expose app
exports = module.exports = app;
