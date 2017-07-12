import React, {PropTypes} from 'react'
import {selection, select, events} from 'd3-selection';
import {importTemplates} from 'utils'
import uuid from 'node-uuid'
import {TimelineMax} from 'gsap';
import {CSSTransitionGroup} from 'react-transition-group';

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			g: null,
			el: importTemplates(['originalHex'])
		}

		this.colors = ['#343838', '#005F6B', '#008C9E', '#00B4CC', '#00DFFC'];
		this.cubeDirections = [
			{
				x: + 1,
				y: -1,
				z: 0
			}, {
				x: + 1,
				y: 0,
				z: -1
			}, {
				x: 0,
				y: + 1,
				z: -1
			}, {
				x: -1,
				y: + 1,
				z: 0
			}, {
				x: -1,
				y: 0,
				z: + 1
			}, {
				x: 0,
				y: -1,
				z :+ 1
			}
		]

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

	offsetToCubeCoords(hex) {
		let x = hex.col - (hex.row + (hex.row & 1)) / 2;
		let z = hex.row;
		let y = -x - z;

		return {x, y, z}
	}
	getDirection(direction) {
		return this.cubeDirections[direction]
	}

	addToHex(a, b) {
		return {
			x: a.x + b.x,
			y: a.y + b.y,
			z: a.z + b.z
		}
	}

	subtractFromHex(a, b) {
		return {
			x: a.x - b.x,
			y: a.y - b.y,
			z: a.z - b.z
		}
	}

	scaleHex(a, k) {
		return {
			x: a.x * k,
			y: a.y * k,
			z: a.z * k
		}
	}
	hexLength(hex)
	{
		return Math.trunc((Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2);
	}

	findNeighbor(hex, direction)
	{
		return this.addToHex(hex, this.getDirection(direction));
	}

	cubeToOffsetCoords() {}

	componentDidMount() {}

	shouldComponentUpdate() {
		return false;
	}

	hexRing(center, radius) {
		let results = [];
		let hex = this.addToHex(center, this.scaleHex(this.getDirection(4), radius));
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < radius; j++) {
				results.push(hex);
				hex = this.findNeighbor(hex, i);
			}
		}
		return results;
	}

	generateData(selection, width, height) {
		const hSize = 15;
		const hSpacing = 12.5;
		const vSpacing = 8.5;
		const hAmount = Math.floor(width / (hSize + hSpacing));
		const vAmount = Math.floor(height / (hSize + vSpacing));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
		const offset = -13.5;

		let templateHexagon = this.state.el.originalHex;
		let hCollection = [];
		let cubeHCollection = {};
		let count = 0;
		let offsetCoords = {};
		let cubeCoords = {}

		for (let vHexagons = 0; vHexagons < vAmount; vHexagons++) {
			let row = [],
				translate,
				translatedHexagon;

			for (let hHexagons = 0; hHexagons < hAmount; hHexagons++) {
				let calculatedHSpacing = (hSize + hSpacing) * hHexagons,
					calculatedVSpacing = (hSize + vSpacing) * vHexagons;

				translate = vHexagons % 2 === 0
					? `${calculatedHSpacing}, ${calculatedVSpacing}`
					: `${calculatedHSpacing + offset}, ${calculatedVSpacing}`;

				translatedHexagon = selection.append('g').attr('transform', `translate(${translate})`).attr('class', 'hex');

				translatedHexagon.html(templateHexagon);

				translatedHexagon.select('polygon').attr('class', 'hexagon').on('click', function(d) {});

				offsetCoords = {
					row: vHexagons,
					col: hHexagons
				};
				cubeCoords = this.offsetToCubeCoords(offsetCoords);
				translatedHexagon.attr('id', `${cubeCoords.x} ${cubeCoords.y} ${cubeCoords.z}`);

				cubeHCollection[`${cubeCoords.x} ${cubeCoords.y} ${cubeCoords.z}`] = {
					cubeCoords,
					translatedHexagon
				};
				row.push(translatedHexagon);

				count++
			}
			hCollection.push(row);
		}

		return {hCollection, cubeHCollection};
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
				fn = (direction === 'right')
					? addRight
					: addLeft;
			let t = [start];

			for (let j = 1; j < times; j++) {
				let r = fn([y, x]);
				y = r.y;
				x = r.x;
				t.push({y, x});
			}
			return {
				start,
				end: {
					y,
					x
				},
				t
			};
		}

		function isEven(n) {
			return (n % 2 === 0);
		}

		function adjust(obj, direction, adj) {
			return (direction === 'r')
				? {
					x: obj.x + adj,
					y: obj.y
				}
				: {
					x: obj.x - adj,
					y: obj.y
				};
		}

		function remap(arr, cb) {

			let removed = arr.splice(arr.length - 2, 2)
			let a = arr.map(cb);
			return a.concat(removed);
		}

		let hexArr = this.hexagonArray;
		let coords = {
			y: Math.floor(hexArr.length / 2),
			x: Math.floor(hexArr[0].length / 2) - 1
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
			let topLayer = (isEven(o.y))
					? {
						y: o.y - 1,
						x: o.x + 1
					}
					: {
						y: o.y - 1,
						x: o.x
					},
				level = i + 1,
				bottomLayer = Object.assign({}, topLayer);
			bottomLayer.y += (layers - 1);

			for (let j = 0; j < layers; j++) {

				isTopDone = (topLayer.y < 0)
					? true
					: false;
				isBtmDone = (bottomLayer.y > hexArr.length - 1)
					? true
					: false;

				if (isTopDone === false) {
					isTopDone = true;
					let sides = chooseHex(topLayer, 'left', topBtmAmount, hexArr);
					leftSide.push(sides.end);
					rightSide.push(sides.start);
					t = [
						...t,
						...sides.t
					];
				}

				if (isBtmDone === false) {
					isBtmDone = true;
					let sides = chooseHex(bottomLayer, 'left', topBtmAmount, hexArr);
					leftSide.push(sides.end);
					rightSide.push(sides.start);
					t = [
						...t,
						...sides.t
					];
				}
				if (isTopDone && isBtmDone) {
					if (level === 1) {
						let adjustedleft = adjust(o, 'l', 1);
						let adjustedright = adjust(o, 'r', 1);
						let left = chooseHex(adjustedleft, 'left', 1, hexArr).start;
						let right = chooseHex(adjustedright, 'right', 1, hexArr).start;
						rightSide.push(right);
						leftSide.push(left);
						t = [
							...t,
							left,
							right
						];
						totalLayers.push(t);
						break;
					}
					rightSide = remap(rightSide, (obj) => {
						if (typeof obj === 'undefined')
							return;
						let adjusted = adjust(obj, 'r', 1);
						if (adjusted.x > hexArr[0].length - 1)
							return;
						if (adjusted.y < 0 || adjusted.y > hexArr.length - 1)
							return;
						let sides = chooseHex(adjusted, 'right', 1, hexArr)
						t = [
							...t,
							...sides.t
						];
						return adjusted;
					});

					leftSide = remap(leftSide, (obj) => {
						if (typeof obj === 'undefined')
							return;

						let adjusted = adjust(obj, 'l', 1);
						if (adjusted.x > hexArr[0].length || adjusted.x < 0)
							return;
						if (adjusted.y < 0 || adjusted.y > hexArr.length - 2)
							return;
						let sides = chooseHex(adjusted, 'left', 1, hexArr)
						t = [
							...t,
							...sides.t
						];
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
		let data = this.generateData(this.state.g, window.innerWidth + 35, window.innerHeight + 35);

		this.hexagonArray = data.hCollection;
		this.hexagonCubeArray = data.cubeHCollection;

		this.hexagonCubeArray["4 -4 0"].translatedHexagon.style('stroke', 'red')

		let s = this.hexagonCubeArray["5 -25 20"].cubeCoords;
		let center = this.hexagonCubeArray[`${s.x} ${s.y} ${s.z}`].cubeCoords;
		let res = this.hexRing(s, 10);

		res.forEach((d) => {
			this.hexagonCubeArray[`${d.x} ${d.y} ${d.z}`].translatedHexagon.style('stroke', 'yellow');
		})

		console.log(res)
		// this.layers = this.selectHexagons();
		// this.animation = [];

		// this.layers.forEach((obj, i, a) => {
		// 	let total = a.length - 1;
		// 	if (obj.length === 0)
		// 		obj.forEach((obj2, j, b) => {
		// 			let node = this.hexagonArray[obj2.y][obj2.x].node();
		// 			let secondTotal = b.length - 1;
		//
		// 			let tl = new TimelineMax();
		// 			this.animation.push(tl);
		// 			if (j === secondTotal - 1 && i === total - 1) {
		// 				tl.from(node.children[0], 2, {
		// 					transformOrigin: '50% 50%',
		// 					fill: '#041122',
		// 					repeatDelay: i * .05,
		// 					repeat: 1,
		// 					cycle: 2,
		// 					yoyo: true,
		// 					onComplete: () => {
		//
		// 						for (let v of this.animation) {
		// 							v.restart();
		// 						}
		// 					}
		// 				})
		// 			} else {
		// 				tl.from(node.children[0], 2, {
		// 					transformOrigin: '50% 50%',
		// 					fill: '#041122',
		// 					repeatDelay: i * .05,
		// 					repeat: 1,
		// 					cycle: 2,
		// 					yoyo: true
		// 				});
		// 			}
		// 		})
		// })

	}

	componentDidMount() {}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
