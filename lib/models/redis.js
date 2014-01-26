'use strict';
var redis = require('redis');
var redisClient = null;

var db = function(callback) {
  redisClient = redis.createClient();
  redisClient.on('connect', function() {
    callback();
  });
  redisClient.on('error', function(err) {
    console.log('Redis error: ' + err);
  });
};

db.prototype = {

  createSticky: function(roomId, stickyId, sticky) {
    if (redisClient.ready === true) {
      var stickyString = JSON.stringify(sticky);
      redisClient.hset(
        'roomId:' + roomId + '-sticky',
        stickyId,
        stickyString
      );
    }
  },

  getAllSticky: function(roomId, callback) {
    if (redisClient.ready === true) {
      redisClient.hgetall('roomId:' + roomId + '-sticky', function(err, res) {
        var stickies = [];
        for (var i in res) {
          stickies.push(JSON.parse(res[i]));
        }
        console.dir(stickies);
        callback(stickies);
      });
    } else {
      callback();
    }
  },

  editSticky: function(roomId, stickyId, text) {
    if (redisClient.ready === true) {
      redisClient.hget('roomId:' + roomId + '-sticky', stickyId, function(err, res) {
        var sticky = JSON.parse(res);
        if (sticky !== null) {
          sticky.text = text;
          redisClient.hset('roomId:' + roomId + '-sticky', stickyId, JSON.stringify(sticky));
        }
      });
    }
  },

  changeColor: function(roomId, stickyId, color) {
    if (redisClient.ready === true) {
      redisClient.hget('roomId:' + roomId + '-sticky', stickyId, function(err, res) {
        var sticky = JSON.parse(res);
        if (sticky !== null) {
          sticky.color = color;
          redisClient.hset('roomId:' + roomId + '-sticky', stickyId, JSON.stringify(sticky));
        }
      });
    }
  },

  moveSticky: function(roomId, stickyId, top, left) {
    if (redisClient.ready === true) {
      redisClient.hget('roomId:' + roomId + '-sticky', stickyId, function(err, res) {
        var sticky = JSON.parse(res);
        if (sticky !== null) {
          sticky.top = top;
          sticky.left = left;
          redisClient.hset('roomId:' + roomId + '-sticky', stickyId, JSON.stringify(sticky));
        }
      });
    }
  },

  deleteSticky: function(roomId, stickyId) {
    if (redisClient.ready === true) {
      redisClient.hdel('roomId:' + roomId +'-sticky', stickyId);
    }
  }

};

exports.db = db;
