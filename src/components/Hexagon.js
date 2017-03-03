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
				y3: 3,
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


	gravitate() {
    //remove access to global variable.
		let bBox = this.getBBox(),
			mPos = d3.mouse(this);
		bg.followCursor(this, bBox, mPos);

		console.log(this.id);
	}

	generateData = function(data) {
		let actualHexData = [],
			xOffset = 40,
			yOffset = 63;

		for (let i = 0; i < 19; i++) {
			let xSpacing = i * 80;


			for (let j = 0; j < 21; j++) {
				let ySpacing = j * 125;

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

	pop() {
		let popLocation = [
			"-10, -10",
			"10, -10",
			"-12, 0",
			"12, 0",
			"10, 10",
			"-10, 10"
		]

		for (var j = 0; j < this.children.length; j++) {
			d3.select(this.children[j]).transition()
				.attr('transform', `translate(${popLocation[j]})`)
				.transition()
				.attr('transform', 'translate(0,0)')
				.duration(1000).ease(d3.easeElasticIn);
		}
	}

	followCursor(selection, bBox, mPos) {
		let sel = d3.select(selection);

		let tBounce = function(selection, x, y, n) {
			let s = d3.select(selection);

			s.transition()
				.duration(500)
				.ease(d3.easeBounce)
				.attr('transform', `translate(${x}, ${y})`)
				.on('end', () => {
					if (n) {
						return;
					}
					tBounce(selection, 0, 0, 'stop');
				})
		}

		if (mPos[0] < bBox.x) {
			tBounce(selection, -10, 0);
			// return;
		}
		if (mPos[1] < bBox.y) {
			tBounce(selection, 0, -10);
			// return;
		}
		if (mPos[1] > bBox.y + bBox.height) {
			tBounce(selection, 0, 10);
			// return;
		} else if (mPos[0] > bBox.x + bBox.width) {
			tBounce(selection, 10, 0);
			// return;
		}
	}

	generateHex(svg) {
		let coll = this.generateData(this.hexagonData);
		let self = this;

		coll.forEach((d, i) => {
			let group = svg.append('g')
				.attr('id', `hex-${i}`)
				.attr('class', 'hexagon')
				.on('mouseleave', this.gravitate)
				.on('click', this.pop);

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

	float(yCoord, direction) {
    //remove duplication
		let glasses = d3.select('#glasses');
    let up = 'up';

		if (direction && yCoord) {
			glasses.transition()
				.attr('transform', `translate(185,${yCoord})`)
				.duration(1500)
        .ease(d3.easeSinOut)
				.on('end', () => {
					this.float(yCoord + 100);
				});

        console.log(yCoord);
		} else {
      this.float(yCoord + 100, up);
      console.log(yCoord);

      // glasses.transition()
			// 	.attr('transform', 'translate(185,)')
			// 	.duration(1500).ease(d3.easeSinOut)
			// 	.on('end', () => {
			// 		this.float(up);
			// 	})
		}


	}

	create() {
		let self = this;
		let svg = d3.select('body')
			.append('svg')
			.attrs(this.svg_attrs);

		this.generateHex(svg);

		let glasses = svg.append('g').attr('id', 'glasses').attr('transform', 'translate(185,1000)');

		let legs = d3.select('#leg');
		let content = legs.html();

		glasses.append('g')
			.attr('id', 'glasses')
			.html(content);

		legs.remove();

		let frame = d3.select('#frame');
		let extracontent = frame.html();

		glasses.append('g')
			.attr('id', 'frame')
			.html(extracontent);

		frame.remove();
		this.float(1000, 'down');

	}
}
