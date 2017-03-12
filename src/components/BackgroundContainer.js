import Scream from 'scream';
import Hexagon from 'Hexagon';
import Glasses from 'Glasses';

export default class BackgroundContainer {
	constructor() {
    //screenHeight, screenWidth, orientation
    this.svg_attrs = {
      // Using a 16:9 ratio for a canvas ensures the entire surface is visible on all mobile devices.
      "viewBox": "0 0 " + 1280 + " " + 720,
      "preserveAspectRatio": "xMinYMin meet",
    };

    this.svgContainer = d3.select('body').append('svg').attrs(this.svg_attrs);

    this.hexagon = new Hexagon(this.svgContainer, true);


    //Check for mobile.
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.svgContainer.attr('viewBox', '0 0 720 1280');
			this.hexagon.generateHex(false);

			this.svgContainer.on('click', () => {
				var el = document.documentElement,
					rfs = el.requestFullscreen ||
					el.webkitRequestFullScreen ||
					el.mozRequestFullScreen ||
					el.msRequestFullscreen;

				rfs.call(el);
			})
		}
		//
    this.glasses = new Glasses(this.svgContainer, 720/1.25, 1280/2)

		// this.scream = Scream({
		// 	width: {
		// 		portrait: 1440,
		// 		landscape: 2560
		// 	}
		// });





	}

}
