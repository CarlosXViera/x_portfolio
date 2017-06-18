import React, { PropTypes } from 'react'
import { selection, select, events } from 'd3-selection';
import { importTemplates } from 'utils'
import uuid from 'node-uuid'
import { TimelineMax } from 'gsap';

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		this.el = importTemplates(['originalHex']);

		this.colors = ['#343838', '#005F6B', '#008C9E', '#00B4CC', '#00DFFC'];

	}

	state = {
		g: null
	}

	onRef = (ref) => {
		this.setState({
				g: select(ref)
			}, () => this.renderHexagons(this.props.orientation)
			//this.randomSpinTurn();
		)
	}

	componentWillReceiveProps(nextProps) {
		this.renderHexagons(nextProps.orientation);
	}

	componentWillMount() {}

	shouldComponentUpdate() {
		return false;
	}

	generateData(selection, width, height) {
		const hSize = 15;
		const hSpacing = 12.5;
		const vSpacing = 8.5;
		const hAmount = Math.floor(width / (hSize + hSpacing));
		const vAmount = Math.floor(height / (hSize + vSpacing));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
		const offset = -13.5;

		let templateHexagon = this.el.originalHex;
		let hCollection = [];
		let count = 0;

		for (let vHexagons = 0; vHexagons < vAmount; vHexagons++) {
			let row = [],
				translate,
				translatedHexagon;

			for (let hHexagons = 0; hHexagons < hAmount; hHexagons++) {
				let calculatedHSpacing = (hSize + hSpacing) * hHexagons,
					calculatedVSpacing = (hSize + vSpacing) * vHexagons;

				translate = vHexagons % 2 === 0 ? `${calculatedHSpacing}, ${calculatedVSpacing}` :
					`${calculatedHSpacing + offset}, ${calculatedVSpacing}`;

				translatedHexagon = selection.append('g')
					.attr('id', `${vHexagons}${hHexagons}`)
					.attr('transform', `translate(${translate})`)
					.attr('class', 'hex');

				translatedHexagon.html(templateHexagon);

				translatedHexagon.select('polygon')
					.attr('class', 'hexagon').on('click', function(d) {});

				row.push(translatedHexagon);

				count++
			}
			hCollection.push(row);
		}

		return hCollection;
	}

	selectHexagons() {

		// TODO: Optimize this function.
		// TODO: When browser is resized vertically, horizontal hexagons are not selected.
		// FIXME: Flicker on resize.

		function chooseHex(start, direction, times, arr) {
			function addLeft(arr) {
				return {
					y: arr[0],
					x: arr[1] - 1
				}
			}

			function addRight(arr) {
				return {
					y: arr[0],
					x: arr[1] + 1
				}
			}

			let x = start.x,
				y = start.y,
				fn = (direction === 'right') ? addRight : addLeft;
			let t = [start];

			for (let j = 1; j < times; j++) {
				let r = fn([y, x]);
				y = r.y;
				x = r.x;
				t.push({ y, x });
			}
			return { start, end: { y, x }, t };
		}

		function isEven(n) {
			return (n % 2 === 0);
		}

		function adjust(obj, direction, adj) {
			return (direction === 'r') ? { x: obj.x + adj, y: obj.y } : { x: obj.x - adj, y: obj.y };
		}

		function remap(arr, cb) {

			let removed = arr.splice(arr.length - 2, 2)
			let a = arr.map(cb);
			return a.concat(removed);
		}

		let hexArr = this.hexagonArray;
		let coords = {
			y: Math.floor(hexArr.length / 2),
			x: Math.floor(hexArr[0].length / 2)
		};
		let o = coords;
		let topBtmAmount = 2,
			layers = 3;
		let isTopDone = false,
			isBtmDone = false;
		let rings = hexArr.length - 1;
		let leftSide = [],
			rightSide = [];
		let totalLayers = [];

		for (let i = 0; i < rings; i++) {
			let t = [];
			let topLayer = (isEven(o.y)) ? { y: o.y - 1, x: o.x + 1 } : { y: o.y - 1, x: o.x },
				level = i + 1,
				bottomLayer = Object.assign({}, topLayer);
			bottomLayer.y += (layers - 1);

			for (let j = 0; j < layers; j++) {

				isTopDone = (topLayer.y < 0) ? true : false;
				isBtmDone = (bottomLayer.y > hexArr.length - 1) ? true : false;

				if (isTopDone === false) {
					isTopDone = true;
					let sides = chooseHex(topLayer, 'left', topBtmAmount, hexArr);
					leftSide.push(sides.end);
					rightSide.push(sides.start);
					t = [...t, ...sides.t];
				}

				if (isBtmDone === false) {
					isBtmDone = true;
					let sides = chooseHex(bottomLayer, 'left', topBtmAmount, hexArr);
					leftSide.push(sides.end);
					rightSide.push(sides.start);
					t = [...t, ...sides.t];
				}
				if (isTopDone && isBtmDone) {
					if (level === 1) {
						let adjustedleft = adjust(o, 'l', 1);
						let adjustedright = adjust(o, 'r', 1);
						let left = chooseHex(adjustedleft, 'left', 1, hexArr).start;
						let right = chooseHex(adjustedright, 'right', 1, hexArr).start;
						rightSide.push(right);
						leftSide.push(left);
						t = [...t, left, right];
						totalLayers.push(t);
						break;
					}
					rightSide = remap(rightSide, (obj) => {
						if (typeof obj === 'undefined') return;
						let adjusted = adjust(obj, 'r', 1);
						if (adjusted.x > hexArr[0].length - 1) return;
						if (adjusted.y < 0 || adjusted.y > hexArr.length - 1) return;
						let sides = chooseHex(adjusted, 'right', 1, hexArr)
						t = [...t, ...sides.t];
						return adjusted;
					});

					leftSide = remap(leftSide, (obj) => {
						if (typeof obj === 'undefined') return;

						let adjusted = adjust(obj, 'l', 1);
						if (adjusted.x > hexArr[0].length || adjusted.x < 0) return;
						if (adjusted.y < 0 || adjusted.y > hexArr.length - 2) return;
						let sides = chooseHex(adjusted, 'left', 1, hexArr)
						t = [...t, ...sides.t];
						return adjusted;
					});
					if (t.length === 0)
						continue;
					totalLayers.push(t);
					break;
				}
			}
			t = [];
			/* change values here */
			o = topLayer;
			isTopDone = false;
			isBtmDone = false;
			topBtmAmount++;
			layers += 2;
		}
		return totalLayers;
	}

	renderHexagons(props) {
		let all = this.state.g.selectAll('g.hex').remove();
		this.hexagonArray = this.generateData(this.state.g, window.innerWidth + 60, window.innerHeight + 60);


		this.layers = this.selectHexagons();
		this.animation = [];


		this.layers.forEach((obj, i, a) => {
			let total = a.length - 1;
			if (obj.length === 0) console.log('empty')
			obj.forEach((obj2, j, b) => {
				let node = this.hexagonArray[obj2.y][obj2.x].node();
				let secondTotal = b.length - 1;

				let tl = new TimelineMax();
				this.animation.push(tl);
				if (j === secondTotal - 1 && i === total - 1) {
					tl.from(node.children[0], 2, {
						transformOrigin: '50% 50%',
						scale: .9,
						fill: '#061A30',
						repeatDelay: i * .05,
						repeat: 1,
						cycle: 2,
						yoyo: true,
						onComplete: () => {

							for (let v of this.animation) {
								v.restart();
							}
						}
					})
				} else {
					tl.from(node.children[0], 2, { transformOrigin: '50% 50%', scale: .9, fill: '#061A30', repeatDelay: i * .05, repeat: 1, cycle: 2, yoyo: true });
				}
			})
		})

	}

	componentDidMount() {

	}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
