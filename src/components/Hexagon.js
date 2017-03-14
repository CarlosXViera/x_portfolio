export default class Hexagon {
	constructor(svgContainer, orientation) {
		this.self = this;

		this.svgContainer = svgContainer;
		this.orientation = orientation;
		this.colors = ['#6A888C', '#5F7174', '#A5E65A', '#00A6C0', '#32D9CB'];

		this.templateHex = d3.select('#templateHex').html();
		this.originalHex = d3.select('#originalHex').html();
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

		this.generateHex(orientation);

	}

	addHammerEventListener(that, d){
		let mc = new Hammer.Manager(myElement);
		mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
		mc.on('doubletap', ()=>{
			console.log('doubleTAPPED!')
		})

	}

	gravitate(callback, context, data) {

		let bBox = context.getBBox(),
			mPos = d3.mouse(context);
		callback(context, bBox, mPos, data);
	}

	generateData = function (data, landscape) {
		let actualHexData = [],
			xOffset = 32,
			yOffset = 55;
		//landscape or portrait
		let maxX = landscape ? 25 : 12;
		let maxY = landscape ? 9 : 12;

		for (let i = 0; i < maxX; i++) {
			let xSpacing = i * 63;


			for (let j = 0; j < maxY; j++) {
				let ySpacing = j * 110;

				actualHexData.push({
					temp: this.templateHex,
					original: this.originalHex,
					fx: xSpacing,
					fy: ySpacing,
					tx: xSpacing,
					ty: ySpacing,
					transform: `translate(${xSpacing}, ${ySpacing})`,
					data,
					quad: [xSpacing, ySpacing],
					colors: this.colors
				});

				actualHexData.push({
					temp: this.templateHex,
					original: this.originalHex,
					fx: xSpacing + xOffset,
					fy: ySpacing + yOffset,
					tx: xSpacing + xOffset,
					ty: ySpacing + yOffset,
					transform: `translate(${xSpacing + xOffset}, ${ySpacing + yOffset})`,
					data,
					quad: [xSpacing + xOffset, ySpacing + yOffset],
					colors: this.colors
				})
			}
		}

		return actualHexData;
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

	polarToRectangular(radius, degrees) {
		let theta = degrees * (Math.PI / 180);

		return {
			x: radius * Math.cos(theta),
			y: radius * Math.sin(theta),
			degrees
		}
	}

	generateHex(landscape) {
		//remove all previous hexagons that could be on the stage
		d3.selectAll('.hexagon').remove();

		let self = this;

		let coll = this.generateData(this.hexagonData, landscape);

		let collisionForce = d3.forceCollide(30).strength(1.2).iterations(1);

		let simulation = d3.forceSimulation(coll).alphaDecay(0.01).force('collision', collisionForce);

		let nodes = this.svgContainer.selectAll('g')
			.data(coll)
			.enter()
			.append('g')
			.attrs({
				id: (d, i) => `hex-${i}`,
				class: 'hexagon',
				transform: (d) => d.transform
			}).call(d3.drag().subject(dragsubject)
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended))
			.on('click', circlularAnim)
			.on('mouseleave', (d, i, a) => {
				self.gravitate(self.followCursor, a[i], d)
			})

		//append triangle collection after adding the simulation if done simultaneously
		//translation occurs to all child nodes.
		nodes.each((dt, i, a) => {
			addHammerEventListener(dt, a[i])
			dt.selector = d3.select(a[i],dt);
			dt.selector.html(dt.temp);
		})

		function addHammerEventListener(d, that){
				let mc = new Hammer(that);
				mc.on('press', ()=>{
					pop(d, that)

				})

			}

		function pop(datum, svgObj) {

			d3.select(svgObj).html(datum.original);
			let popLocation = [
				"5, -5",
				"5, 0",
				"5, 5",
				"-5, -5",
				"-5, 5",
				"-5, 0"
			]
			d3.selectAll(svgObj.children).each((d, i, a) => {

				d3.select(a[i]).selectAll('g').each((d, i, b) => {

					d3.select(b[i]).transition('boom')
						.attr('transform', `translate(${popLocation[i]})`)
						.transition('something else')
						.attr('transform', 'translate(0,0)')
						.duration(800).on('end', ended);

				})

			});

			function ended(d, i, a) {
				d3.select(svgObj).html(datum.temp);
			}

		}

		function dragsubject(d, i, a) {
			return a[i];
		}

		function circlularAnim(d, i, a) {
			d3.event.stopPropagation();

			simulation.stop();

			let nodesLength = 1250,
				hex = 6,
				r = 32.5,
				c = 360,
				m = 1,
				s = 1,
				t = 0,
				circleArray = [];

			for (let j = 1; j <= nodesLength; j++) {
				(t / hex >= 1) ? (s = 1, m++, t = 1, hex += 6) : (++t, s++);
				let degrees = (c / hex) * t;

				let ang = self.polarToRectangular(r * m, degrees);
				let f1 = (ang.x + d.tx) - 5;
				let f2 = (ang.y + d.ty);
				let foundNode = simulation.find(f1, f2);
				if (typeof foundNode === 'undefined') continue;

				//remove duplicates
				circleArray.includes(foundNode) ? '' : circleArray.push(foundNode);

				let stashedNode = circleArray[circleArray.length - 1].selector.select('#overlay').transition('fadeout').style('stroke', '#A5E65A').duration(.8 * j).ease(d3.easeBackIn);
				if (j === nodesLength) {
					stashedNode.on('end', () => {
						for (let n of circleArray.reverse()) {
							n.selector.select('#overlay').transition('revert').style('stroke', '#32D9CB').ease(d3.easeBackOut).duration(1000)
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

			let node = simulation.find(d3.event.x - 32, d3.event.y - 32, 900);
			if (node === d) return;
			randomColor(node, d.colors);
		}

		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function randomColor(node, colors) {
			let originalColor = node.selector.select('#overlay').style('fill'),
				selectedColor = colors[getRandomInt(0, colors.length)];

			node.selector.select('#overlay').style('fill', selectedColor);
		}

		function dragended(d) {
			simulation.stop();
			coll.forEach(function (d) {
				d.selector.transition('dragged').attr('transform', `translate(${d.tx}, ${d.ty})`)
					.duration(800).ease(d3.easeBounce).on('end', function () {
						d.x = d.tx
						d.y = d.ty
					})
				d.selector.select('#overlay').transition('revertColor').style('fill', d.colors[0]).duration(800).ease(d3.easeBounce);

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
}
