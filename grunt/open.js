module.exports = {
  dev: {
    path: 'http://localhost:<%= express.dev.options.port %>'
  },
  prod: {
    path: 'http://localhost:<%= express.prod.options.port %>'
  }
};
