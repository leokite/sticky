'use strict';
var redis = require('redis');
var url = require('url');
var redisURL = null;
var redisClient = null;

var db = function() {
  if (process.env.REDISCLOUD_URL) {
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    redisClient = redis.createClient(redisURL.port, redisURL.hostname, {'no_ready-check': true});
    redisClient.auth(redisURL.auth.split(":")[1]);
  } else {
    redisClient = redis.createClient();
  }
  redisClient.on('error', function(err) {
    console.log('redis client error ' + err);
  });
};

db.prototype = {
  addSticky: function(roomId, stickyId, sticky) {
    if (redisClient !== null) {
      var stickyString = JSON.stringify(sticky);
      redisClient.hset(
        'roomId:' + roomId + '-sticky',
        stickyId,
        stickyString
      );
    }
  },

  getAllSticky: function(roomId, callback) {
    if (redisClient !== null) {
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
    if (redisClient !== null) {
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
    if (redisClient !== null) {
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
    if (redisClient !== null) {
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
    if (redisClient !== null) {
      redisClient.hdel('roomId:' + roomId +'-sticky', stickyId);
    }
  }
};

exports.db = db;
