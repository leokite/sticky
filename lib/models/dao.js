var conf = require('../config/db.js').database;
exports.db = require('./' + conf.type + '.js').db;
