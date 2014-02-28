'use strict';

// var path = require('path');

// exports.partials = function(req, res) {
  // var stripped = req.url.split('.')[0];
  // var requestedView = path.join('./', stripped);
  // res.render(requestedView, function(err, html) {
    // if(err) {
      // res.render('404');
    // } else {
      // res.send(html);
    // }
  // });
// };

exports.main = function(req, res) {
  res.render('index');
};
