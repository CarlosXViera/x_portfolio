export default class Glasses {
	constructor(svgContainer, xCoord, yCoord) {
		this.self = this;
		this.svgContainer = svgContainer;


		this.glasses = svgContainer.append('g')
			.attrs({
				id: 'glasses',
				transform: `translate(${xCoord}, ${yCoord})`
			}).call(d3.drag().on('start', () => {
				console.log('start');
			}));

		this.templates = this.ripHtml();
		this.glasses.html(this.templates.front)
		this.float(this.glasses, xCoord, yCoord - 50, false, this.showUpDown);

		window.addEventListener('deviceorientation', this.sprite.bind(this), true);

	}

	ripHtml() {
		let templates = {}
		d3.selectAll('.template').each((d, i, a) => {
			templates[a[i].id] = d3.select(a[i]).html();
		}).remove()

		return templates;
	}

	showUpDown(sel, numX, numY) {
		//have to keep translated x value constant
		return sel.transition('updown')
			.attr('transform', `translate(${numX}, ${numY})`)
			.duration(1500)
			.ease(d3.easeSinOut);
	}

	float(sel, xCoord, yCoord, toggling, callback) {
		let self = this;
		if (toggling) {
			callback(sel, xCoord, yCoord).on('end',
				() => self.float(sel, xCoord, yCoord, !toggling, callback));
		} else {
			callback(sel, xCoord, (yCoord - 50)).on('end',
				() => self.float(sel, xCoord, yCoord, !toggling, callback))
		}
	}

	sprite(e) {
		if (e.gamma < 20 && e.gamma > -20) {
			this.glasses.html(this.templates.front);
		}
		if (e.gamma < 30 && e.gamma > 21) {
			this.glasses.html(this.templates.left1);
		}
		if (e.gamma < 40 && e.gamma > 31) {
			this.glasses.html(this.templates.left2);
		}
		if (e.gamma < 50 && e.gamma > 41) {
			this.glasses.html(this.templates.left3);
		}
		if (e.gamma < -21 && e.gamma > -30) {
			this.glasses.html(this.templates.right1);
		}
		if (e.gamma < -31 && e.gamma > -40) {
			this.glasses.html(this.templates.right2);
		}
		if (e.gamma < -41 && e.gamma > -50) {
			this.glasses.html(this.templates.right3);
		}
		if (e.beta < 40) {
			this.glasses.html(this.templates.top1);
		}
		if (e.beta < 30) {
			this.glasses.html(this.templates.top2);
		}
		if (e.beta < 20) {
			this.glasses.html(this.templates.top3);
		}
		if (e.beta > 90) {
			this.glasses.html(this.templates.bottom1)
		}
		if (e.beta > 100) {
			this.glasses.html(this.templates.bottom2)
		}
		if (e.beta > 110) {
			this.glasses.html(this.templates.bottom3)
		}



	}

}
