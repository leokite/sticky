'use strict';
var mongodb = require('mongodb');
var conf = require('../config/db.js').database;
var mongoUri = process.env.MONGOHQ_URL ||
  process.env.MONGOLAB_URI ||
  'mongodb://' + conf.hostname + ':' + Number(conf.port) + '/' + conf.dbname ;
var rooms = null;

var db = function() {
  mongodb.Db.connect(mongoUri, function(err, db) {
    if (!err) {
      db.collection('rooms', function(err, collection) {
        collection.ensureIndex([['name', 1]], false, function() {});
        rooms = collection;
      });
    }
  });
};

db.prototype = {
  createSticky: function(roomId, stickyId, sticky) {
    if (rooms !== null) {
      var doc = {};
      doc['stickies.' + stickyId] = sticky;
      rooms.update({name:roomId}, {$set:doc}, {upsert:true},
        function(err, object) {
          if (err) {
            console.warn(err.message);
          } else {
            console.dir(object);
          }
        }
      );
    }
  },

  getAllSticky: function(roomId, callback) {
    if (rooms !== null) {
      rooms.findOne({name:roomId}, {stickies:true},
        function(err, roomId) {
          if (roomId) {
            callback(roomId.stickies);
          } else {
            callback();
          }
        }
        );
    } else {
      callback();
    }
  },

  editSticky: function(roomId, stickyId, text) {
    if (rooms !== null) {
      var doc = {};
      doc['stickies.' + stickyId + '.text'] = text;
      rooms.update({name:roomId}, {$set:doc},
        function(err, object) {
          if (err) {
            console.warn(err.message);
          } else {
            console.dir(object);
          }
        }
      );
    }
  },

  changeColor: function(roomId, stickyId, color) {
    if (rooms !== null) {
      var doc = {};
      doc['stickies.' + stickyId + '.color'] = color;
      rooms.update({name:roomId}, {$set:doc},
        function(err, object) {
          if (err) {
            console.warn(err.message);
          } else {
            console.dir(object);
          }
        }
      );
    }
  },

  moveSticky: function(roomId, stickyId, top, left) {
    if (rooms !== null) {
      var doc = {};
      doc['stickies.' + stickyId + '.top'] = top;
      doc['stickies.' + stickyId + '.left'] = left;
      rooms.update({name:roomId}, {$set:doc},
        function(err, object) {
          if (err) {
            console.warn(err.message);
          } else {
            console.dir(object);
          }
        }
      );
    }
  },

  deleteSticky: function(roomId, stickyId) {
    if (rooms !== null) {
      var doc = {};
      doc['stickies.' + stickyId] = true;
      rooms.update({name:roomId}, {$unset:doc},
        function(err, object) {
          if (err) {
            console.warn(err.message);
          } else {
            console.dir(object);
          }
        }
      );
    }
  }
};

exports.db = db;
