import Scream from 'scream';
import Glasses from 'Glasses';

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

		this.scream = Scream({
			width: {
				portrait: 1440,
				landscape: 2560
			}
		});

		this.create();

		// this.frames = new Glasses(d3.select('svg'), 185, 1000);
	}

	gravitate(callback, context, data) {

		let bBox = context.getBBox(),
			mPos = d3.mouse(context);
		callback(context, bBox, mPos, data);
	}

	generateData = function (data, landscape) {
		let actualHexData = [],
			xOffset = 40,
			yOffset = 63;
		//landscape or portrait
		let maxX = landscape ? 33 : 19;
		let maxY = landscape ? 12 : 21;


		for (let i = 0; i < maxX; i++) {
			let xSpacing = i * 80;


			for (let j = 0; j < maxY; j++) {
				let ySpacing = j * 125;

				actualHexData.push({
					tx: xSpacing,
					ty: ySpacing,
					transform: `translate(${xSpacing}, ${ySpacing})`,
					data
				});

				actualHexData.push({
					tx: xSpacing + xOffset,
					ty: ySpacing + yOffset,
					transform: `translate(${xSpacing + xOffset}, ${ySpacing + yOffset})`,
					data
				})
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

	followCursor(selection, bBox, mPos, dt) {

		let sel = d3.select(selection);

		let tBounce = function (selection, x, y, ox, oy, n) {
			let s = d3.select(selection);

			s.transition()
				.duration(500)
				.ease(d3.easeBounce)
				.attr('transform', `translate(${ox + x}, ${oy + y})`)
				.on('end', () => {
					if (n) {
						return;
					}
					tBounce(selection, 0, 0, ox, oy, 'stop');
				})
		}

		if (mPos[0] < bBox.x) {
			tBounce(selection, -10, 0, dt.tx, dt.ty);
			// return;
		}
		if (mPos[1] < bBox.y) {
			tBounce(selection, 0, -10, dt.tx, dt.ty);
			// return;
		}
		if (mPos[1] > bBox.y + bBox.height) {
			tBounce(selection, 0, 10, dt.tx, dt.ty);
			// return;
		} else if (mPos[0] > bBox.x + bBox.width) {
			tBounce(selection, 10, 0, dt.tx, dt.ty);
			// return;
		}
	}

	toObject(arr) {
		var rv = {};
		for (var i = 0; i < arr.length; ++i)
			if (arr[i] !== undefined) rv[i] = arr[i];
		return rv;
	}

	generateHex(svg, landscape) {
		d3.selectAll('.hexagon').remove();

		let coll = this.generateData(this.hexagonData, landscape);
		let self = this;

		let nodes = svg.selectAll('g')
			.data(coll)
			.enter()
			.append('g')
			.attrs({
				id: (d, i) => `hex-${i}`,
				class: 'hexagon',
				transform: (d) => d.transform
			})
			.on('click', this.pop)
			.on('mouseleave', (d, i, a) => self.gravitate(self.followCursor, a[i], d));

			nodes.each((dt, i , a)=>{
				d3.select(a[i]).selectAll('polygon').data(dt.data).enter().append('polygon').attrs({
				id: (d, i) => `triangle-${i}`,
				points: (d) => `${d.x1} ${d.y1} ${d.x2} ${d.y2} ${d.x3} ${d.y3} ${d.x4} ${d.y4}`
			})})

		// .on('click', this.pop)
		//
		// .each(function (dt, i) {
		//
		// 	d3.select(this)
		// 		.selectAll('polygon')
		// 		.data(Object.keys(dt))
		// 		.enter()
		// 		.append('polygon')
		// 		.attrs({
		// 			id: (d, i) => `triangle-${i}`,
		// 			points: (d, i) => `${dt[i].x1} ${dt[i].y1} ${dt[i].x2} ${dt[i].y2} ${dt[i].x3} ${dt[i].y3} ${dt[i].x4} ${dt[i].y4}`
		// 		});
		// });
		//
		// 	simulation.nodes(coll);
		// console.log(coll);

		return coll;
	}

	create() {
		let self = this;
		let svg = d3.select('body')
			.append('svg')
			.attrs(this.svg_attrs);

		svg.on('click', () => {
			var el = document.documentElement,
				rfs = el.requestFullscreen ||
				el.webkitRequestFullScreen ||
				el.mozRequestFullScreen ||
				el.msRequestFullscreen;

			rfs.call(el);
		})


		this.scream.on('orientationchangeend', () => {
			let orientation = this.scream.getOrientation();


			if (orientation === 'landscape') {
				svg.attr('viewBox', '0 0 2560 1440');
				self.generateHex(svg, true);
			} else {
				svg.attr('viewBox', '0 0 1440 2560');
				self.generateHex(svg, false);
			}

		});
	}
}
