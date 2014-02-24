'use strict';
/* global element, by:false */
describe('test', function() {
  var addButton;

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('/index.html');
    addButton = element(by.id('add-button'));
  });

  it('should append a sticky', function() {
    addButton.click();
  });
});
