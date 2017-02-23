var expect = require('expect');


browser.url('http://localhost:3000');
describe('Hexagon', () => {
	it('should exist', () => {
		var bg = browser.execute(function() {
			return window.bg;
		});
		expect(bg).toExist();
	});

	it('should blah', () => {

		for (var i = 0; i < 739; i++) {
			let coords = browser.getAttribute(`#hexagon-${i}`, 'transform')
				.replace("translate(", "")
				.replace(")", "")
				.split(",")

			if (parseInt(coords[0]) < 0 || parseInt(coords[1]) < 0) {
				continue;
			} else {
        browser.click(`#hexagon-${i}`);
			}

		}
	});

});
