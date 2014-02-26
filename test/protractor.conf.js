// A reference configuration file.
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // ----- What tests to run -----
  //
  // Spec patterns are relative to the location of this config.
  specs: [
    'scripts/e2e/**/*.js',
  ],

  // Patterns to exclude.
  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome'
  },

  // ----- More information for your tests ----
  //
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000',

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    // onComplete: null,
    // If true, display spec names.
    // isVerbose: false,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    // includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    // defaultTimeoutInterval: 30000
  },

  // ----- Options to be passed to mocha -----
  //
  // See the full list at http://visionmedia.github.io/mocha/
  mochaOpts: {
    ui: 'bdd',
    reporter: 'list'
  },
};
