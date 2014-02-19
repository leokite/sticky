'use strict';
var room = require('../models/room.js');
var dao = require('../models/dao.js').db;
// var db = new dao(function() {});
var db = new dao();
module.exports = function(socket) {
  socket.on('joinRoom', function(path) {
    console.log('joinRoom');
    room.addToRoom(socket, path);
    socket.emit('roomAccept');
  });

  socket.on('initClient', function() {
    console.log('initClient');
    var roomId = room.getRoom(socket);
    db.getAllSticky(roomId, function(sticky) {
      socket.json.emit('initSticky', sticky);
    });
  });

  socket.on('addSticky', function(sticky) {
    console.log('addSticky');
    var roomId = room.getRoom(socket);
    db.addSticky(roomId, sticky.id, sticky);
    room.broadcastToRoommates(socket, 'addSticky', sticky);
  });

  socket.on('moveSticky', function(stickies) {
    console.log('moveStickyParams= ' + stickies);
    var roomId = room.getRoom(socket);
    for (var i = stickies.length; i--; ) {
      console.log(stickies[i]);
      db.moveSticky(roomId, stickies[i].id, stickies[i].top, stickies[i].left);
    }
    room.broadcastToRoommates(socket, 'moveSticky', stickies);
  });

  socket.on('editSticky', function(sticky) {
    console.log('editStickyParams= ' + sticky);

    var roomId = room.getRoom(socket);
    db.editSticky(roomId, sticky.id, sticky.text);
    room.broadcastToRoommates(socket, 'editSticky', sticky);
  });

  socket.on('removeSticky', function(id) {
    var roomId = room.getRoom(socket);
    db.deleteSticky(roomId, id);
    room.broadcastToRoommates(socket, 'removeSticky', id);
  });

  socket.on('changeColor', function(sticky) {
    var roomId = room.getRoom(socket);
    db.changeColor(roomId, sticky.id, sticky.color);
    room.broadcastToRoommates(socket, 'changeColor', sticky);
  });

  socket.on('disconnect', function() {
    console.log(socket.id + ' just left');
    room.removeFromAllRooms(socket);
  });
};
