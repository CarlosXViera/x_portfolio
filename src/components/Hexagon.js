export default class Hexagon {
	constructor() {
		this.self = this;
		this.hexagonData = [{
				x1: 0,
				y1: -30,
				x2: -30,
				y2: -12,
				x3: 0,
				y3: 3,
				x4: 0,
				y4: -30
			},
			{
				x1: 30,
				y1: -12,
				x2: 0,
				y2: -30,
				x3: 0,
				y3: 3,
				x4: 30,
				y4: -12
			},
			{
				x1: -30,
				y1: -12,
				x2: -30,
				y2: 18,
				x3: 0,
				y3: 3,
				x4: -30,
				y4: -12
			},
			{
				x1: 0,
				y1: 3,
				x2: 30,
				y2: 18,
				x3: 30,
				y3: -12,
				x4: 0,
				y4: 3
			},
			{
				x1: 0,
				y1: 36,
				x2: 30,
				y2: 18,
				x3: 0,
				y3: -12,
				x4: 0,
				y4: 36
			},
			{
				x1: -30,
				y1: 18,
				x2: 0,
				y2: 36,
				x3: 0,
				y3: 3,
				x4: -30,
				y4: 18
			}
		];

		this.svg_attrs = {
			// Using a 16:9 ratio for a canvas ensures the entire surface is visible on all mobile devices.
			"viewBox": "0 0 " + 1440 + " " + 2560,
			"preserveAspectRatio": "xMinYMin meet",
		};

		this.create();
	}


	gravitate(self, mouse) {
		let groups = document.getElementsByTagName('svg')[0].children;

		for (let bBox of groups) {
			if(self.intersectHex(mouse, bBox.getBoundingClientRect(), 10)){
				self.followCursor(bBox, 'towards', mouse);
			} else{
				self.followCursor(bBox, 'reverse');
			}
		}
	}


	generateData = function (data) {
		let actualHexData = [],
			xOffset = 40,
			yOffset = 63;

		for (let i = 0; i < 19; i++) {
			let xSpacing = i * 80;


			for (let j = 0; j < 20; j++) {
				let ySpacing = j * 133;

				actualHexData.push(data.map((datum) => {
					return {
						x1: datum.x1 + xSpacing,
						y1: datum.y1 + ySpacing,
						x2: datum.x2 + xSpacing,
						y2: datum.y2 + ySpacing,
						x3: datum.x3 + xSpacing,
						y3: datum.y3 + ySpacing,
						x4: datum.x4 + xSpacing,
						y4: datum.y4 + ySpacing
					}
				}))

				actualHexData.push(data.map((datum) => {
					return {
						x1: datum.x1 + xSpacing + xOffset,
						y1: datum.y1 + ySpacing + yOffset,
						x2: datum.x2 + xSpacing + xOffset,
						y2: datum.y2 + ySpacing + yOffset,
						x3: datum.x3 + xSpacing + xOffset,
						y3: datum.y3 + ySpacing + yOffset,
						x4: datum.x4 + xSpacing + xOffset,
						y4: datum.y4 + ySpacing + yOffset
					}
				}))
			}
		}

		return actualHexData;
	}

	intersectHex(m, rect, offset) {
		return (
			(m[0] < rect.left && m[0] > rect.left - offset) ||
			(m[1] > rect.bottom && m[1] < rect.bottom + offset) ||
			(m[0] > rect.right && m[0] < rect.right + offset) ||
			(m[1] < rect.top && m[1] > rect.top - offset)
		)
	}

	followCursor(box, direction, mouse) {

		switch (direction) {
		case 'towards':
			d3.select(box)
				.transition()
				.attr('transform', `translate(${mouse[0]},${mouse[1]})`)
				.duration(5000);
			break;
		case 'reverse':
			d3.select(box)
				.transition()
				.attr('transform', `translate(0,0)`)
				.duration(300);
		}

		return;
	}

	generateHex(svg) {
		let coll = this.generateData(this.hexagonData);

		coll.forEach((d, i) => {
			let group = svg.append('g')
				.attr('id', `hex-${i}`)

			let iter = 0;

			for (let tri of d) {
				++iter
				group.append('polygon')
					.attrs({
						id: `triangle-${iter}`,
						points: `${tri.x1} ${tri.y1} ${tri.x2} ${tri.y2} ${tri.x3} ${tri.y3} ${tri.x4} ${tri.y4}`
					})
			}
		})

		return coll;
	}

	create() {
		let self = this;
		let svg = d3.select('body')
			.append('svg')
			.attrs(this.svg_attrs)
			.on('mousemove', function () {
				let mPos = d3.mouse(this);
				self.gravitate(self, mPos);
			});

		this.generateHex(svg)
	}
}
