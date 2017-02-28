export default class Hexagon {
	constructor() {
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

		// this.hexPositions = this.generatePositions();

		this.create();
	}

	gravitate() {
    let mPos = d3.mouse(this);
    console.log(mPos[0]);
    let bBox = this.getBoundingClientRect();
    let offset = 5;
    if(mPos[0] > bBox.right - offset && mPos[0] < bBox.right){
      console.log('To the right!');
    }
	}

	duplicate(sel, data, remove) {
		let content = d3.select(`#${sel.attr('id')}`).html();

		data.forEach((d, i) => {
			let newSel = d3.select('svg')
				.append('g')
				.html(content)
				.attr('class', 'hexagon')
				.attr('id', `hexagon-${i}`)
				.attr('transform', `translate${d}`)
				.on('click', this.pop);
		})
		sel.remove();

	}

	generateData = function(data)

	{
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

	pop() {
		let popLocation = [
			"-15, -15",
			"15, -15",
			"-15, 0",
			"15, 0",
			"15, 15",
			"-15, 15"
		]

		for (var j = 0; j < this.children.length; j++) {
			d3.select(this.children[j]).transition()
				.attr('transform', `translate(${popLocation[j]})`)
				.transition()
				.attr('transform', 'translate(0,0)')
				.duration(600);
		}

	}

	create() {
		let svg = d3.select('body')
			.append('svg')
			.attrs(this.svg_attrs);

		let coll = this.generateData(this.hexagonData);

		coll.forEach((d, i) => {
			let group = svg.append('g')
				.attr('id', `hex-${i}`)
				.on('mouseout', this.gravitate);

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

	}
}
