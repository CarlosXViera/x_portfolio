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
			"viewBox": "0 0 " + 2560 + " " + 1440,
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
		let maxX = landscape ? 25 : 14;
		let maxY = landscape ? 9 : 16;


		for (let i = 0; i < maxX; i++) {
			let xSpacing = i * 80;


			for (let j = 0; j < maxY; j++) {
				let ySpacing = j * 125;

				actualHexData.push({
					fx: xSpacing,
					fy: ySpacing,
					tx: xSpacing,
					ty: ySpacing,
					transform: `translate(${xSpacing}, ${ySpacing})`,
					data,
					quad: [xSpacing, ySpacing]
				});

				actualHexData.push({
					fx: xSpacing + xOffset,
					fy: ySpacing + yOffset,
					tx: xSpacing + xOffset,
					ty: ySpacing + yOffset,
					transform: `translate(${xSpacing + xOffset}, ${ySpacing + yOffset})`,
					data,
					quad: [xSpacing + xOffset, ySpacing + yOffset]
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
			d3.select(this.children[j]).transition('boom')
				.attr('transform', `translate(${popLocation[j]})`)
				.transition('something else')
				.attr('transform', 'translate(0,0)')
				.duration(1000).ease(d3.easeElasticIn);
		}
	}

	followCursor(selection, bBox, mPos, dt) {

		let sel = d3.select(selection);

		let tBounce = function (selection, x, y, ox, oy, n) {
			let s = d3.select(selection);

			s.transition('follow')
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

	polarToRectangular(radius, degrees) {
		let theta = degrees * (Math.PI / 180);

		return {
			x: radius * Math.cos(theta),
			y: radius * Math.sin(theta),
			degrees
		}
	}

	generateHex(svg, landscape) {
		//remove all previous hexagons that could be on the stage
		d3.selectAll('.hexagon').remove();

		let self = this;

		let coll = this.generateData(this.hexagonData, landscape);

		let collisionForce = d3.forceCollide(35).strength(1).iterations(1);

		let simulation = d3.forceSimulation(coll).alphaDecay(0.10).force('collision', collisionForce);

		let nodes = svg.selectAll('g')
			.data(coll)
			.enter()
			.append('g')
			.attrs({
				id: (d, i) => `hex-${i}`,
				class: 'hexagon',
				transform: (d) => d.transform
			})
			.on('click', circlularAnim)
			.on('mouseleave', (d, i, a) => self.gravitate(self.followCursor, a[i], d))
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended))


		//append triangle collection after adding the simulation if done simultaneously
		//translation occurs to all child nodes.
		nodes.each((dt, i, a) => {
			dt.selector = d3.select(a[i]);
			dt.selector.selectAll('polygon').data(dt.data).enter().append('polygon').attrs({
				id: (d, i) => `triangle-${i}`,
				points: (d) => `${d.x1} ${d.y1} ${d.x2} ${d.y2} ${d.x3} ${d.y3} ${d.x4} ${d.y4}`
			})
		})

		function circlularAnim(d, i, a) {
			//pause the simulation to conserve resources.
			simulation.stop();

			let nodesLength = a.length * 3,
				hex = 36,
				r = 71.2,
				c = 360,
				m = 1,
				s = 1,
				t = 0,
				points = [60, 120, 180, 240, 300, 360],
				circleArray = [];

			for (let j = 1; j <= nodesLength; j++) {
				(t / hex >= 1) ? (s = 1, hex += 6, m++, t = 1) : (++t, s++);
				let degrees = (c / hex) * t;
				r = points.includes(degrees) ? 73.5 : 69.35;

				let ang = self.polarToRectangular(r * m, degrees);
				let f1 = ang.x + d.tx;
				let f2 = ang.y + d.ty;
				let foundNode = simulation.find(f1, f2);

				//remove duplicates
				circleArray.includes(foundNode) ? '' : circleArray.push(foundNode);
				let stashedNode = foundNode.selector.transition('fadeout').style('fill', '#008C9E').duration(.6 * j).ease(d3.easeBounceIn);
				if (j === nodesLength) {
					stashedNode.on('end', () => {
						for (let n of circleArray.reverse()) {
							n.selector.transition('revert').style('fill', '#005f6B').ease(d3.easeBackOut).duration(2000)
						}

					})
				}

			}

		}

		function dragstarted(d) {
			for (let g of coll) {
				g.fx = null;
				g.fy = null;
			}
			simulation.restart();
			simulation.alpha(0.7);
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
			let node = simulation.find(d3.event.x, d3.event.y, 200);
			randomColor(node)
		}

		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function randomColor(node) {
			let originalColor = node.selector.style('fill');
			let colors = ['#00B4CC', '#00DFFC', '#008C9E']
			let selectedColor = colors[getRandomInt(0, 2)]

			node.selector.style('fill', selectedColor);
		}

		function dragended(d) {
			simulation.stop();
			coll.forEach(function (d) {
				d.selector.transition('dragged').attr('transform', `translate(${d.tx}, ${d.ty})`).style('fill', '#005f6B')
				.duration(800).ease(d3.easeBounce).on('end', function () {
					d.x = d.tx
					d.y = d.ty
				})

			})
			d.fx = null;
			d.fy = null;
			simulation.alphaTarget(0.1);
		}

		function ticked() {

			nodes.attr('transform', (d) => `translate(${Math.floor(d.x)}, ${Math.floor(d.y)})`);
		}

		simulation.on("tick", ticked);

		return coll;
	}

	create() {
		let self = this;
		let svg = d3.select('body')
			.append('svg')
			.attrs(this.svg_attrs);

			//initialize the screen
			svg.attr('viewBox', '0 0 1440 2560');
			self.generateHex(svg, true);

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				svg.attr('viewBox', '0 0 1080 1920');
				self.generateHex(svg, false);

				svg.on('click', () => {
					var el = document.documentElement,
						rfs = el.requestFullscreen ||
						el.webkitRequestFullScreen ||
						el.mozRequestFullScreen ||
						el.msRequestFullscreen;

					rfs.call(el);
				})

}



		this.scream.on('orientationchangeend', () => {
			let orientation = this.scream.getOrientation();


			if (orientation === 'landscape') {
				svg.attr('viewBox', '0 0 1920 1080');
				self.generateHex(svg, true);
			} else {
				svg.attr('viewBox', '0 0 1080 1920');
				self.generateHex(svg, false);
			}

		});
	}
}
