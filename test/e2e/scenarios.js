'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('task app', function() {

  beforeEach(function() {
    browser.get('app/index.html');
  });

  it('should be possible to see appropriate task (active and completed) in appropriate tabs', function() {

    var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
    var query = element(by.model('query'));

    function getNames() {
      return phoneNameColumn.map(function(elm) {
        return elm.getText();
      });
    }

    query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

    expect(getNames()).toEqual([
      "Motorola XOOM\u2122 with Wi-Fi",
      "MOTOROLA XOOM\u2122"
    ]);

    element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

    expect(getNames()).toEqual([
      "MOTOROLA XOOM\u2122",
      "Motorola XOOM\u2122 with Wi-Fi"
    ]);
  });

});







