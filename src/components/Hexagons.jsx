import React, {PropTypes} from 'react'
import {importTemplates, getRandomInt, polarToRectangular} from 'utils'

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		this.el = importTemplates(['originalHex', 'templateHex']);

		this.colors = ['#6A888C', '#5F7174', '#A5E65A', '#00A6C0', '#32D9CB'];

		this.collisionForce = d3.forceCollide(25).strength(1).iterations(1);

		this.simulation = d3.forceSimulation(this.hexagonsData).alphaDecay(0.01).force('collision', this.collisionForce).on('tick', this.ticked.bind(this)).stop();
	}

	state = {
		g: null
	}

	onRef = (ref) => {
		this.setState({
			g: d3.select(ref)
		}, () => this.renderHexagons(this.props.orientation))
	}

	generateData(orientation) {
		let actualHexData = [],
			xOffset = 32,
			yOffset = 55;
		//landscape or portrait
		let maxX = orientation === 'landscape'
			? 25
			: 12;
		let maxY = orientation === 'landscape'
			? 9
			: 12;

		for (let i = 0; i < maxX; i++) {
			let xSpacing = i * 63;

			for (let j = 0; j < maxY; j++) {
				let ySpacing = j * 110;

				actualHexData.push({
					temp: this.el.templateHex,
					original: this.el.originalHex,
					fx: xSpacing,
					fy: ySpacing,
					tx: xSpacing,
					ty: ySpacing,
					transform: `translate(${xSpacing}, ${ySpacing})`,
					colors: this.colors
				});

				actualHexData.push({
					temp: this.el.templateHex,
					original: this.el.originalHex,
					fx: xSpacing + xOffset,
					fy: ySpacing + yOffset,
					tx: xSpacing + xOffset,
					ty: ySpacing + yOffset,
					transform: `translate(${xSpacing + xOffset}, ${ySpacing + yOffset})`,
					colors: this.colors
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
		}).call(d3.drag().on("start", this.dragstarted.bind(this)).on("drag", this.dragged.bind(this)).on("end", this.dragended.bind(this))).on('click', this.clickAnimation.bind(this))

		// .on('click', circlularAnim.bind(this)).on('mouseleave', (d, i, a) => {
		// 	self.gravitate(self.followCursor, a[i], d)
		// })

		this.nodes.each((dt, i, a) => {
			dt.selector = d3.select(a[i], dt);
			dt.selector.html(dt.temp);
		});

	}

	componentWillReceiveProps(nextProps) {
		this.renderHexagons(nextProps.orientation);
	}

	shouldComponentUpdate() {
		return false;
	}

	gravitate(callback, context, data) {

		let bBox = context.getBBox(),
			mPos = d3.mouse(context);
		callback(context, bBox, mPos, data);
	}

	followCursor(selection, bBox, mPos, dt) {

		let sel = d3.select(selection);

		let tBounce = function(selection, x, y, ox, oy, n) {
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

	popAnimation(datum, svgObj) {
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

				d3.select(b[i]).transition('boom').attr('transform', `translate(${popLocation[i]})`).transition('something else').attr('transform', 'translate(0,0)').duration(800).on('end', ended);
			})
		});

		function ended(d, i, a) {
			d3.select(svgObj).html(datum.temp);
		}
	}

	clickAnimation(d, i, a) {
		this.simulation.stop();

		let nodesLength = 1250,
			hex = 6,
			r = 32.5,
			c = 360,
			m = 1,
			s = 1,
			t = 0,
			circleArray = [];

		for (let j = 1; j <= nodesLength; j++) {
			(t / hex >= 1)
				? (s = 1, m++, t = 1, hex += 6)
				: (++t, s++);
			let degrees = (c / hex) * t;

			let ang = polarToRectangular(r * m, degrees);
			let f1 = (ang.x + d.tx) - 5;
			let f2 = (ang.y + d.ty);
			let foundNode = this.simulation.find(f1, f2);
			if (typeof foundNode === 'undefined')
				continue;

			//remove duplicates
			circleArray.includes(foundNode)
				? ''
				: circleArray.push(foundNode);

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

	randomColor(node, colors) {
		let originalColor = node.selector.select('#overlay').style('fill'),
			selectedColor = colors[getRandomInt(0, colors.length)];

		node.selector.select('#overlay').style('fill', selectedColor);
	}

	dragstarted(d, i, a) {
		this.simulation.stop();
		for (let g of this.hexagonsData) {
			g.fx = null;
			g.fy = null;
		}
		this.simulation.restart();
		this.simulation.alpha(1.0);
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

	dragended(d) {
		this.simulation.stop();
		this.hexagonsData.forEach(function(d) {
			d.selector.transition('dragged').attr('transform', `translate(${d.tx}, ${d.ty})`).duration(800).ease(d3.easeBounce).on('end', function(d) {
				d.x = d.tx
				d.y = d.ty
				d3.select(this).select('#overlay').transition('revertColor').style('fill', d.colors[0]).duration(800).ease(d3.easeBounce);
			})
			// d.selector.select('#overlay')

		})
		d.fx = null;
		d.fy = null;
		this.simulation.alphaTarget(0.1);
	}

	ticked() {
		this.nodes.attr('transform', (d) => `translate(${Math.floor(d.x)}, ${Math.floor(d.y)})`);
	}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}

}
