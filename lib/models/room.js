'use strict';
var roomIdToClient = {};
var clientIdToRoomId = {};

exports.addToRoom = function(client, roomId) {
  if (!(clientIdToRoomId.hasOwnProperty(client.id))) {
    clientIdToRoomId[client.id] = [];
  }
  clientIdToRoomId[client.id].push(roomId);
  console.log(clientIdToRoomId);

  if (!(roomIdToClient.hasOwnProperty(roomId))) {
    roomIdToClient[roomId] = [];
  }
  roomIdToClient[roomId].push(client);
  console.log(roomIdToClient);
};

exports.getRoom = function(client) {
  var clientRooms;
  if (clientIdToRoomId.hasOwnProperty(client.id)) {
    clientRooms = clientIdToRoomId[client.id].concat();
    if (typeof(clientRooms) !== undefined) {
      return clientRooms[0];
    }
  }
  return null;
};

exports.getRoommates = function(client) {
  var roommates = [];
  if (clientIdToRoomId.hasOwnProperty(client.id)) {
    var roomId = clientIdToRoomId[client.id];
    console.log('roomId: ' + roomId);
    if (roomIdToClient.hasOwnProperty(roomId)) {
      var clients = roomIdToClient[roomId].concat();
      for (var i = clients.length; i--;) {
        console.log('client: ' + clients[i]);
        roommates.push(clients[i]);
      }
    }
  }
  roommates.splice(roommates.indexOf(client), 1); // exclude myself
  return roommates.concat();
};

exports.removeFromAllRooms = function(client) {
  console.log('client:' + client.id + ' left.');
  if (clientIdToRoomId.hasOwnProperty(client.id)) {
    var roomIds = clientIdToRoomId[client.id].concat();
    for (var i = roomIds.length; i--;) {
      roomIdToClient[roomIds[0]].splice(roomIdToClient[roomIds[0]].indexOf(client), 1);
      if (roomIdToClient[roomIds[0]].length === 0) {
        delete roomIdToClient[roomIds[0]];
      }
      delete clientIdToRoomId[client.id];
    }
  }
};

exports.broadcastToRoommates = function(client, message, data) {
  var roommates = this.getRoommates(client);
  console.log('client:' + client.id + ' is broadcasting to: ');
  for (var i = roommates.length; i--;) {
    console.log(' - ' + roommates[i].id);
    roommates[i].emit(message, data);
  }
};

