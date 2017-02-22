var expect = require('expect');


browser.url('http://localhost:3000');
describe('Hexagon', () => {
    it('should exist', () => {
      var bg = browser.execute(function() {
            return window.bg;
        });
        expect(bg).toExist();
    });

});
