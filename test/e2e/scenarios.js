'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('task app', function() {
  var ptor;

  beforeEach(function() {
      ptor = browser.get('app/index.html');
  });

  it('should be possible to see appropriate task (active and completed) in appropriate tabs', function() {

    var ele = by.css('#result-table');
    expect(ptor.isElementPresent(ele)).toBe(true);

  });

});








