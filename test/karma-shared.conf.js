'use strict';

module.exports = function() {
  return {
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/jquery-ui/ui/jquery-ui.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/scripts/**/*.js',
      'test/lib/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
      'app/other_components/flat-ui/*.js',
      'app/scripts/services/socket.js'
    ],

    // web server port
    port: 8080,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],

    // preprocessors: {
      // 'app/scripts/**/*.js': ['coverage']
    // },

    // test results reporter to use
    // possible values:'dots', 'progress', 'junit', 'growl', 'coverate'
    reporters: ['progress'],

    // coverageReporter: {
      // type: 'html',
      // dir: 'test/coverage/',
    // },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true
  };
};
