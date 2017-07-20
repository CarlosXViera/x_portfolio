import React, {PropTypes} from 'react'
import {importTemplates} from 'utils'
import {withRouter} from 'react-router-dom';
import uuid from 'node-uuid'
import {TweenMax, TimeLineMax, Sine, Bounce, Power4} from 'gsap';
import {CSSTransitionGroup} from 'react-transition-group';
import {Transition} from 'Transitions';
import {pad, shuffle, getRandomFloat, getRandomInt, transpose} from 'utils';

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		let data = this.generateData(props.width, props.height);

		this.state = {
			...data
		}

		this.handleMouseOver = this.handleMouseOver.bind(this);

	}

	componentDidMount() {
		this.refresh = this.getRefreshAnimation();
		this.updateAnimations();
		this.waveAnimation.play();
	}

	componentWillReceiveProps({width, height}) {
		console.log('here');
		if (width != this.props.width || height != this.props.height) {
			this.waveAnimation.pause(0);
			this.refresh.play().eventCallback('onComplete', () => this.refresh.reverse(0))

			this.setState({
				...this.generateData(width, height)
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (JSON.stringify(nextProps) !== JSON.stringify(this.props)) && JSON.stringify(nextState) !== JSON.stringify(this.state);
	}

	componentWillUpdate() {
		console.log('here');
	}

	componentDidUpdate() {
		this.updateAnimations(true);
		this.refresh.eventCallback('onReverseComplete', () => this.waveAnimation.play());

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
				z: + 1
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

	scaleHex(a, k) {
		return {
			x: a.x * k,
			y: a.y * k,
			z: a.z * k
		}
	}

	hexLength(hex) {
		return Math.trunc((Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2);
	}

	findNeighbor(hex, direction) {
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

		let key = `${pad(x, 2)}${pad(y, 2)}`;
		return this.state.offsetCoords[key].cubeCoords;
	}

	getHexagonData(row, col, t) {
		let r = pad(row, 2),
			c = pad(col, 2);
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
		const hSize = 19;
		const {height, width} = this.getPixelToHexagon(w, h);
		const longestSide = (width > height)
			? width
			: height;
		const center = this.getHexagonCubicCoords({
			y: width / 2,
			x: height / 2
		});

		for (let i = 1; i < longestSide; i++) {
			let l = this.getHexRing(center, i).map(d => this.getHexagonElement(d)).filter(d => d !== null);
			if (l[0] != null)
				ringLayers.push(l);
			}
		return ringLayers
	}

	handleMouseOver({currentTarget}) {
		let tl = new TimelineMax;
		tl.to(currentTarget, 1, {
			stroke: '#E6F99D',
			strokeWidth: .1,
			opacity: 0,
			repeat: 1,
			yoyo: true,
			ease: Sine.easeInOut,
			onComplete: d => tl.set(currentTarget, {clearProps: 'stroke, opacity, strokeWidth'})
		})
	}

	updateLayers() {
		for (let anim of this.animation) {
			anim.updateTo({
				css: {
					transformOrigin: '50% 50%',
					scale: 1.2 / 2,
					fill: 'yellow'
				}
			}, true);
		}
	}

	updateAnimations(tlExists = false) {
		let rings = this.getRingLayers(this.props.height, this.props.width);

		if (tlExists) {
			this.removeAnimations(this.waveAnimation);
			this.removeAnimations(this.matrixAnimation);
		}

		this.waveAnimation = this.getWaveAnimation(rings, '#C8E98E');
		this.matrixAnimation = this.getMatrixAnimation(this.state.transposedHexagonMap);
	}

	removeAnimations(tl) {
		let children = tl.getChildren();
		tl.pause();
		tl.clear();
		tl.invalidate();
		tl.kill();
		tl.remove();

		for (let child of children) {
			child.pause(0);
			child.kill();
			child.invalidate();
			TweenMax.set(child, {clearProps: 'all'});
		}
	}

	getRefreshAnimation() {
		let refreshTl = new TimelineMax(), {hexcontainer, refreshPaneContainer, refreshPane} = this.refs;

		refreshTl.fromTo(hexcontainer, 0, {
			zIndex: -1
		}, {zIndex: 1000});
		refreshTl.fromTo(refreshPaneContainer, 0, {
			visibility: 'hidden'
		}, {visibility: 'visible'});
		refreshTl.fromTo(refreshPane, 1, {
			width: '0%',
			ease: Power4.easeInOut
		}, {
			width: '100%',
			ease: Power4.easeInOut
		});

		return refreshTl.reverse();
	}

	getMatrixAnimation(matrix, fills = [
		'#259073',
		'#7FDA89',
		'#C8E98E',
		'#E6F99D',
		'#FFFFFF',
		'#000000'
	]) {
		let shuffled = shuffle(matrix.slice()),
			matrixTl = new TimelineMax({repeat: -1});

		shuffled.forEach((row, rowIndex, rowArr) => {
			let lineTl = new TimelineMax(),
				stroke = fills[getRandomInt(0, 6)],
				speed = getRandomFloat(.1, 5),
				lineDelay = 5 * getRandomInt(0, 10),
				linePosition = rowIndex / rowArr;

			row.forEach((col, colIndex, colArr) => {
				let hexagon = this.refs[col.pRef],
					placement = colIndex / colArr,
					params = {
						transformOrigin: '50% 50%',
						scale: .5,
						stroke,
						delay: .05 * colIndex,
						repeat: 1,
						yoyo: true,
						repeatDelay: 1,
						ease: Sine.easeIn
					};

				lineTl.add(TweenMax.to(hexagon, speed, params), placement);
			})
			matrixTl.add(lineTl.delay(lineDelay), linePosition);

		})
		return matrixTl.pause();

	}

	getWaveAnimation(rings, stroke = '#071F3A') {
		let amplitude = 1.2,
			frequency = 40,
			segments = rings.length * 40,
			tl = new TimelineMax({repeat: -1}),
			params = {
				transformOrigin: '50% 50%',
				scale: -.2,
				stroke,
				yoyo: true,
				ease: Sine.easeInOut,
				repeat: 1
			}

		rings.forEach((layer, index) => {
			let norm = index / segments;
			tl.add(TweenMax.to(layer, 1.5, params), norm * frequency);
		})

		return tl.pause();
	}

	generateData(width, height) {
		const hSize = 19;
		const hSpacing = 12.5;
		const vSpacing = 8.5;
		const hAmount = Math.floor(width / (hSize + hSpacing));
		const vAmount = Math.floor(height / (hSize + vSpacing));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
		const offset = -16.5;
		let offsetCoords = {},
			hexagonsAttrs = [],
			hexagonMap = [],
			cubeCoordinates = {},
			cubeCoords = {};

		for (let vHexagons = 0; vHexagons < vAmount; vHexagons++) {
			let row = [],
				col = [],
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

		return {hexagonMap, cubeCoordinates, hexagonsAttrs, offsetCoords, transposedHexagonMap: transpose(hexagonMap)};
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
					<path className='hexagon' ref={pRef} d="M29 8.4L14.5 0 0 8.4V25l14.5 8.4L29 25zM14.5 33l-14-8.3v-16l14-8 14 8v16z"/>
				</g>
			)
		})

	}

	render() {
		let {hexagonsAttrs} = this.state;
		return (
			<svg ref="hexcontainer" className='hexcontainer' id="main" viewBox={this.props.viewBox} preserveAspectRatio="xMinYMin meet">
				<g className='hexagons'>
					{this.renderHexagons(hexagonsAttrs)}
				</g>
				<g ref='refreshPaneContainer' className='refresh-pane-container'>
					<rect ref='refreshPane' className='refresh-pane'></rect>
				</g>
			</svg>
		)
	}
}
