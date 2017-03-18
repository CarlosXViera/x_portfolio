import React, {PropTypes} from 'react'
import {importTemplates, getRandomInt, polarToRectangular, addPressEventListener, endAll} from 'utils'
import uuid from 'node-uuid'

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		this.el = importTemplates(['originalHex', 'templateHex']);

		this.colors = ['#6A888C', '#5F7174', '#A5E65A', '#00A6C0', '#32D9CB'];

		this.collisionForce = d3.forceCollide(30).strength(1).iterations(1);

		this.simulation = d3.forceSimulation().alphaDecay(0.01).force('collision', this.collisionForce).on('tick', this.ticked.bind(this));
		this.simulation.alpha(0.0);

	}

	state = {
		g: null
	}

	onRef = (ref) => {
		this.setState({
			g: d3.select(ref)
		}, () => this.renderHexagons(this.props.orientation))
	}

	componentWillReceiveProps(nextProps) {
		this.renderHexagons(nextProps.orientation);
	}

	shouldComponentUpdate() {
		return false;
	}

	generateData(orientation) {
		let actualHexData = [],
			xOffset = 32,
			yOffset = 55;
		//landscape or portrait
		let maxX = orientation === 'landscape'
			? 21
			: 12;
		let maxY = orientation === 'landscape'
			? 7
			: 12;

		for (let i = 0; i < maxX; i++) {
			let xSpacing = i * 63;

			for (let j = 0; j < maxY; j++) {
				let ySpacing = j * 110,
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
		}).call(d3.drag().on("start", this.dragstarted.bind(this)).on("drag", this.dragged.bind(this)).on("end", this.dragended.bind(this))).on('click', this.clickAnimation.bind(this)).on('mouseleave', this.gravitate.bind(this)).each((d, i, a) => addPressEventListener(d, a[i], this.popAnimation.bind(this)));

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
				d3.select(`#${node.id} #overlay`).transition(uuid()).style('stroke', node.colors[4]);
			})
		}

		function transitionIt(color) {
			let selection = null;

			circleArray.forEach((node, it, array) => {

				selection = d3.select(`#${node.id} #overlay`).transition(tn).style('stroke', color).delay(5 * it);
				if (it === array.length - 1)
					selection.on('end', ended);
				}
			);
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
			let {x, y} = polarToRectangular(r * m, degrees),
				foundNode = this.simulation.find(x + d.tx, y + d.ty);

			if (circleArray.includes(foundNode))
				continue;

			circleArray.push(foundNode);
		}
		transitionIt(this.colors[2]);
	}

	randomColor(node, colors) {
		let originalColor = d3.select(`#${node.id} #overlay`).style('fill'),
			selectedColor = colors[getRandomInt(0, colors.length)];

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

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
