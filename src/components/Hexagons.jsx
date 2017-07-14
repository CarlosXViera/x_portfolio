import React, {PropTypes} from 'react'
import {importTemplates} from 'utils'
import uuid from 'node-uuid'
import {TweenMax, Sine} from 'gsap';
import {CSSTransitionGroup} from 'react-transition-group';
import {Transition} from 'Transitions';

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		this.animation = [];

		let data = this.generateData(props.width, props.height);

		this.state = {
			...data
		}

		this.handleMouseOver = this
			.handleMouseOver
			.bind(this);

	}

	pad(num, size) {
		let s = num + "";
		while (s.length < size)
			s = "0" + s;
		return s;
	}

	componentDidMount() {
		let ringLayers = this.getRingLayers(this.props.height, this.props.width);
		this.startWaveTransition(ringLayers);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...this.generateData(nextProps.width, nextProps.height)
		})
	}

	componentDidUpdate() {
		let ringLayers = this.getRingLayers(this.props.height, this.props.width);
		this.removeAnimations(this.animation);
		this.startWaveTransition(ringLayers);

	}
	shouldComponentUpdate(nextProps, nextState) {
		return JSON.stringify(nextProps) !== JSON.stringify(this.props);

	}
	componentWillUnmount() {}

	offsetToCubeCoords(hex) {
		let x = hex.col - (hex.row + (hex.row & 1)) / 2;
		let z = hex.row;
		let y = -x - z;

		return {x, y, z}
	}

	cube_to_evenr(cube) {
		let col = cube.x + (cube.z + (cube.z & 1)) / 2
		let row = cube.z;
		return {row, col}
	}

	getDirection(direction) {
		let cubeDirections = [
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
		return cubeDirections[direction]
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

	removeAnimations(arr) {
		for (let anim of arr) {
			let layers = anim.target;
			anim.kill()
			anim.pause(0, true)
			anim.invalidate()
			TweenMax.set(layers, {clearProps: 'all'})
		}
		this.animation = [];
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

	getHexRing(center, radius) {
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

	startWaveTransition(ringLayers, fill = '#071F3A') {

		let amplitude = 1.2;
		let frequency = 40;
		let segments = ringLayers.length * 20;

		ringLayers.forEach((layer, i, arr) => {
			var norm = i / segments;
			var scale = amplitude / 2;
			let stuff = {
				transformOrigin: '50% 50%',
				scale: scale,
				fill,
				repeat: -1,
				yoyo: true,
				ease: Sine.easeIn
			}

			let tl = TweenMax
				.to(layer, 1, stuff)
				.progress(norm * frequency);
			this
				.animation
				.push(tl);
		})
	}

	getHexagonElement(hexCoords) {
		let c = this.state.cubeCoordinates[`${hexCoords.x} ${hexCoords.y} ${hexCoords.z}`]
		if (typeof c === 'undefined')
			return null;
		let key = c.translatedHexagon.pRef;
		return this.refs[key];
	}
	getHexagonElementGroup(hexCoords) {
		let key = this.state.cubeCoordinates[`${hexCoords.x} ${hexCoords.y} ${hexCoords.z}`].translatedHexagon.gRef;
		return this.refs[key];
	}

	getHexagonCubicCoords(offsetCoords) {
		let x = Math.trunc(offsetCoords.x),
			y = Math.trunc(offsetCoords.y);

		let key = `${this.pad(x, 2)}${this.pad(y, 2)}`;
		return this.state.offsetCoords[key].cubeCoords;
	}

	getHexagonData(row, col, t) {
		let r = this.pad(row, 2),
			c = this.pad(col, 2);
		let hexId = `${r}${c}`;
		return {
			id: hexId,
			transforms: t,
			gRef: `g_${hexId}`,
			pRef: `p_${hexId}`,
			offsetCoords: {
				row,
				col
			}
		}
	}

	getPixelToHexagon(width, height) {
		width = Math.floor(width / 27.5);
		height = Math.floor(height / 23.5);
		return {width, height}
	}

	getRingLayers(h, w) {
		let ringLayers = [];
		const hSize = 15;
		const {height, width} = this.getPixelToHexagon(w, h);
		const longestSide = (width > height)
			? width
			: height;
		const center = this.getHexagonCubicCoords({
			y: width / 2,
			x: height / 2
		});

		for (let i = 1; i < longestSide; i++) {
			let l = this
				.getHexRing(center, i)
				.map(d => this.getHexagonElement(d))
				.filter(d => d !== null);
			if (l[0] != null)
				ringLayers.push(l);
			}
		return ringLayers
	}

	handleMouseOver({currentTarget}) {
		TweenMax.to(currentTarget, .5, {
			fill: 'white',
			repeat: 1,
			yoyo: true
		})
	}

	updateLayers() {

		for (let anim of this.animation) {
			anim.updateTo({
				stroke: 'yellow'
			}, false);

		}

	}

	generateData(width, height) {
		const hSize = 15;
		const hSpacing = 12.5;
		const vSpacing = 8.5;
		const hAmount = Math.floor(width / (hSize + hSpacing));
		const vAmount = Math.floor(height / (hSize + vSpacing));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
		const offset = -13.5;
		let offsetCoords = {},
			hexagonsAttrs = [],
			hexagonMap = [],
			cubeCoordinates = {},
			cubeCoords = {}

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

				translatedHexagon = this.getHexagonData(vHexagons, hHexagons, `translate(${translate})`);

				cubeCoords = this.offsetToCubeCoords(translatedHexagon.offsetCoords);

				cubeCoordinates[`${cubeCoords.x} ${cubeCoords.y} ${cubeCoords.z}`] = {
					...cubeCoords,
					translatedHexagon
				}

				offsetCoords[`${translatedHexagon.id}`] = {
					...translatedHexagon,
					cubeCoords
				};

				hexagonsAttrs.push(translatedHexagon);
				row.push(translatedHexagon);
			}
			hexagonMap.push(row);

		}

		return {hexagonMap, cubeCoordinates, hexagonsAttrs, offsetCoords};
	}

	renderHexagons(attrs) {
		return attrs.map(({
			id,
			gRef,
			transforms,
			pRef
		}, i) => {
			return (

				<g key={i} id={id} ref={gRef} transform={transforms}>

					<polygon onClick={() => this.updateLayers()} fill='green' className="hexagon" ref={pRef} points="11.8 9.42 11.8 -5.48 11.8 -5.48 -1.19 -13 -14.19 -5.48 -14.19 9.42 -1.19 17 11.8 9.42"></polygon>
				</g>

			)
		})

	}

	render() {
		let {hexagonsAttrs} = this.state;
		return (

			<div>
				<svg className='hexcontainer' id="main" viewBox={this.props.viewBox} preserveAspectRatio="none">
					<g className='hexagons'>
						{this.renderHexagons(hexagonsAttrs)}
					</g>
				</svg>
			</div>

		)
	}
}
