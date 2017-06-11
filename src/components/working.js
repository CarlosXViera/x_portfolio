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

dt.selector.selectAll('polygon').data(dt.data).enter().append('polygon').attrs({
	id: (d, i) => `triangle-${i}`,
	points: (d) => `${d.x1} ${d.y1} ${d.x2} ${d.y2} ${d.x3} ${d.y3} ${d.x4} ${d.y4}`
})

toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
		if (arr[i] !== undefined) rv[i] = arr[i];
	return rv;
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

	.on('mousemove', function () {
		let mPos = d3.mouse(this);
		self.gravitate(self, mPos);
	})

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

if (mPos[0] < bBox.x) {
	sel.attr('transform', 'translate(10)').duration(1000);
	console.log('right!')
	return;
}
if (mPos[0] > bBox.x) {
	sel.attr('transform', 'translate(10)').duration(1000);
	console.log('left!')
	return;
}
if (mPos[1] > bBox.y) {
	sel.attr('transform', 'translate(0, 10)').duration(1000);
	console.log('down')
	return;
}
if (mPos[1] < bBox.y) {
	sel.attr('transform', 'translate(0, -10)').duration(1000);
	return;
}
//updown

showUpDown(sel, num) {
	//have to keep translated x value constant
	sel.transition()
		.attr('transform', `translate(185, ${num})`)
		.duration(1500)
		.ease(d3.easeSinOut);
}

float(sel, yCoord, toggling) {
	if (toggling) {
		toggling = !toggling; // becomes false
		this.showUpDown(sel, yCoord); //animates down
		this.float(sel, yCoord, toggling); //Passes the current coordinate
	} else {
		toggling = !toggling; //becomes true;
		this.showUpdown(sel, (yCoord - 50));
		this.float(sel, yCoord, toggling);
	}


}




float(yCoord, direction) {
		//remove duplication
		let glasses = d3.select('#glasses');
		let up = 'up';
		console.log(direction);

		if (direction && yCoord) {
			glasses.transition()
				.attr('transform', `translate(185,${yCoord})`)
				.duration(1500)
				.ease(d3.easeSinOut)
				.on('end', () => {
					this.float(yCoord);
				});

			console.log(yCoord);
		} else {
			this.float(yCoord, up);


			// glasses.transition()
			// 	.attr('transform', 'translate(185,)')
			// 	.duration(1500).ease(d3.easeSinOut)
			// 	.on('end', () => {
			// 		this.float(up);
			// 	})
		}




		// original HexContainer

		export default class HexContainer {
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
				this.glasses = new Glasses(this.svgContainer, 720 / 1.25, 1280 / 2)

				// this.scream = Scream({
				// 	width: {
				// 		portrait: 1440,
				// 		landscape: 2560
				// 	}
				// });





			}


			//original HexagonJS

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

				gravitate(callback, context, data) {

					let bBox = context.getBBox(),
						mPos = d3.mouse(context);
					callback(context, bBox, mPos, data);
				}

				generateData(data, landscape) {
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
					let self = this,
						coll = this.generateData(this.hexagonData, landscape);

					let collisionForce = d3.forceCollide(30).strength(1.2).iterations(1),
						simulation = d3.forceSimulation(coll).alphaDecay(0.01).force('collision', collisionForce);

					let nodes = this.svgContainer.selectAll('g')
						.data(coll)
						.enter()
						.append('g')
						.attrs({
							id: (d, i) => `hex-${i}`,
							class: 'hexagon',
							transform: (d) => d.transform
						}).call(d3.drag()
							.on("start", dragstarted)
							.on("drag", dragged)
							.on("end", dragended))
						.on('click', circlularAnim.bind(this))
						.on('mouseleave', (d, i, a) => {
							self.gravitate(self.followCursor, a[i], d)
						})

					//append triangle collection after adding the simulation if done simultaneously
					//translation occurs to all child nodes.
					nodes.each((dt, i, a) => {
						addHammerEventListener(dt, a[i])
						dt.selector = d3.select(a[i], dt);
						dt.selector.html(dt.temp);
					})

					function addHammerEventListener(d, that) {
						let mc = new Hammer(that);
						mc.on('press', () => {
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
						simulation.stop();

						console.log(d)

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
							d.selector
								.transition('dragged')
								.attr('transform', `translate(${d.tx}, ${d.ty})`)
								.duration(800).ease(d3.easeBounce).on('end', function () {
									d.x = d.tx
									d.y = d.ty
								})
							d.selector.select('#overlay')
								.transition('revertColor')
								.style('fill', d.colors[0])
								.duration(800).ease(d3.easeBounce);

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
			///Glasses


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
			/// old hexagons.jsx

			generateData(orientation) {
				let actualHexData = [],
					xOffset = 75,
					yOffset = 35;
				//landscape or portrait
				let maxX = orientation === 'landscape' ?
					60 :
					60;
				let maxY = orientation === 'landscape' ?
					60 :
					60;

				for (let i = 0; i < maxX; i++) {
					let xSpacing = i * 30;

					for (let j = 0; j < maxY; j++) {
						let ySpacing = j * 60,
							obj = {
								temp: this.el.templateHex,
								original: this.el.originalHex,
								colors: this.colors
							}

						actualHexData.push({
							...obj,
							fx: xSpacing,
							fy: ySpacing,
							tx: xSpacing,
							ty: ySpacing,
							transform: `translate(${xSpacing}, ${ySpacing})`
						});

						actualHexData.push({
							...obj,
							fx: xSpacing + xOffset,
							fy: ySpacing + yOffset,
							tx: xSpacing + xOffset,
							ty: ySpacing + yOffset,
							transform: `translate(${xSpacing + xOffset}, ${ySpacing + yOffset})`
						})
					}
				}
				return actualHexData;
			}

			renderHexagons(orientation) {
				d3.selectAll('.hexagon').remove();

				this.hexagonsData = this.generateData(orientation)

				this.simulation.nodes(this.hexagonsData)

				this.nodes = this.state.g.selectAll('g').data(this.hexagonsData).enter().append('g').attrs({
						id: (d, i) => `hex-${i}`,
						class: 'hexagon',
						transform: (d) => d.transform
					}).call(d3.drag().on("start", this.dragstarted.bind(this)).on("drag", this.dragged.bind(this))
						.on("end", this.dragended.bind(this))).on('click', this.clickAnimation.bind(this))
					.on('mouseleave', this.gravitate.bind(this)).each((d, i, a) => addPressEventListener(d, a[i], this.popAnimation.bind(this)));

				this.nodes.each((data, i, a) => {
					data.id = a[i].id;
					d3.select(`#${data.id}`).html(this.el.templateHex);
				});

			}


			gravitate(data, i, a) {
				let context = a[i],
					bBox = context.getBBox(),
					mPos = d3.mouse(context);

				this.followCursor(context, bBox, mPos, data);
			}

			followCursor(selection, bBox, mPos, dt) {

				let sel = d3.select(selection);

				let tBounce = function (selection, x, y, ox, oy, n) {
					let s = d3.select(selection);

					s.transition('follow').duration(500).ease(d3.easeBounce).attr('transform', `translate(${ox + x}, ${oy + y})`).on('end', () => {
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

			popAnimation(data, context) {

				function ended(d, i, a) {
					d3.select(context).html(data.temp);
				}

				function popped(d, i, a) {
					d3.select(this).transition(t).attr('transform', `translate(${popLocation[this.id]})`).transition(t).attr('transform', 'translate(0,0)').on('end', ended);
				}

				let popLocation = [
			"5, -5",
			"5, 0",
			"5, 5",
			"-5, -5",
			"-5, 5",
			"-5, 0"
		],
					t = d3.transition('pop').duration(800).ease(d3.easeElasticInOut);
				// replace the html to memory
				d3.select(context).html(this.el.originalHex);

				d3.selectAll(`#${context.id} g:not(.innerHexagon)`).each(popped);
			}

			clickAnimation(d, i, a) {
				d3.event.stopPropagation();
				this.simulation.stop();

				function ended() {
					circleArray.reverse().forEach((node, it, array) => {
						d3.select(`#${node.id} #overlay`).transition(uuid()).style('stroke', node.colors[1]);
					})
				}

				function transitionIt(color) {
					let selection = null;

					circleArray.forEach((node, it, array) => {

						selection = d3.select(`#${node.id} #overlay`).transition(tn).style('stroke', color).delay(5 * it);
						if (it === array.length - 1)
							selection.on('end', ended);
					});
				}

				let tn = d3.transition(uuid()).duration(500).ease(d3.easeBackInOut);

				let nodesLength = 1250,
					hex = 6,
					r = 32.5,
					c = 360,
					m = 1,
					t = 0,
					circleArray = [];

				for (let j = 1; j <= nodesLength; j++) {

					if ((t / hex) >= 1) {
						m++,
						t = 1,
							hex += 6;
					} else {
						++t;
					}

					let degrees = (c / hex) * t;
					let {
						x,
						y
					} = polarToRectangular(r * m, degrees),
						foundNode = this.simulation.find(x + d.tx, y + d.ty);

					if (circleArray.includes(foundNode))
						continue;

					circleArray.push(foundNode);
				}
				transitionIt(this.colors[2]);
			}

			randomColor(node, colors) {
				let originalColor = d3.select(`#${node.id} #overlay`).style('fill'),
					selectedColor = colors[getRandomInt(1, colors.length)];

				d3.select(`#${node.id} #overlay`).style('fill', selectedColor);
			}

			dragstarted(d, i, a) {
				this.simulation.stop();
				for (let g of this.hexagonsData) {
					g.fx = null;
					g.fy = null;
				}
				this.simulation.restart();
				this.simulation.alpha(0.7);
				d.fx = d.x;
				d.fy = d.y;
			}

			dragged(d) {
				d.fx = d3.event.x;
				d.fy = d3.event.y;

				let node = this.simulation.find(d3.event.x - 32, d3.event.y - 32, 900);
				if (node === d)
					return;
				this.randomColor(node, d.colors);
			}

			// randomSpinTurn() {
			// 	console.log('here')
			//
			// 	let rNum = getRandomInt(0, 250);
			//
			// 	let sel = d3.select(`#hex-${rNum}`);
			// 	let attr = sel.attr('transform');
			// 	let box = sel.node().getBBox();
			//
			//
			//
			// 	sel.selectAll('g').transition().style('fill', 'pink').transition().attr('transform', `rotate(180, -4,0)`).duration(1000).on('end', this.randomSpinTurn);
			// }

			dragended(d) {

				function ended(d) {
					d.x = d.tx;
					d.y = d.ty;
				}

				function revert(d) {
					d3.select(this).transition(t).attr('transform', `translate(${d.tx}, ${d.ty})`).on('end', ended);

					d3.selectAll('#overlay').transition(t).style('fill', d.colors[0]);
				}

				let t = d3.transition('draggedRevert').duration(800).ease(d3.easeBounce);

				this.simulation.stop();
				this.nodes.each(revert);

				d.fx = null;
				d.fy = null;
				this.simulation.alphaTarget(0.1);
			}

			ticked(e) {
				this.nodes.attr('transform', (d) => `translate(${Math.floor(d.x)}, ${Math.floor(d.y)})`);
			}
