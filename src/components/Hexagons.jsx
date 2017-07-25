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

		this.waveAnimation = null;
		this.matrixAnimaton = null;
		this.hexagonRefs = {};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.updateAnimations = this.updateAnimations.bind(this);
		this.getWaveAnimation = this.getWaveAnimation.bind(this);
		this.getMatrixAnimation = this.getMatrixAnimation.bind(this);

	}

	componentDidMount() {
		this.updateAnimations();
		this.matrixAnimation.play();
		TweenMax.ticker.fps(15)
		TweenMax.ticker.lagSmoothing(1000, 1000)
	}

	componentWillReceiveProps({width, height}) {
		if (width != this.props.width || height != this.props.height) {

			this.setState({
				...this.generateData(width, height)
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {

		return (JSON.stringify(nextProps) !== JSON.stringify(this.props)) && JSON.stringify(nextState) !== JSON.stringify(this.state);
	}

	componentWillUpdate() {
		this.removeAnimations(this.outerWaveAnimation);
		this.removeAnimations(this.matrixAnimation);
	}

	componentDidUpdate() {

		this.updateAnimations();

		this.matrixAnimation.play()

		console.log(TweenMax.getAllTweens(true));

	}

	componentWillUnmount() {
		console.log('unmount');
	}

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
		let g = this.state.cubeCoordinates[`${hexCoords.x} ${hexCoords.y} ${hexCoords.z}`]
		if (typeof g === 'undefined')
			return null;
		let key = g.translatedHexagon.gRef;
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
		width = Math.floor(width / 28);
		height = Math.floor(height / 22);
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

	updateAnimations(tlExists = false) {
		let rings = this.getRingLayers(this.props.height, this.props.width);

		this.matrixAnimation = this.getMatrixAnimation(this.state.transposedHexagonMap);
	}

	removeAnimations(tl) {

		for (let child of tl.getChildren(false, true, false)) {
			for (let target of child.target) {
				console.log(target);
				TweenMax.set(target, {clearProps: 'all'});
			}
			child.pause(0);
			child.invalidate();

		}
		tl.pause(0);
		// tl.remove(tl.getChildren());

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
						strokeOpacity: 1,
						scale: -.8,
						stroke,
						delay: .05 * colIndex,
						repeat: 1,
						yoyo: true,
						repeatDelay: 1,
						ease: Power4.easeIn,
						opacity: speed
					};

				lineTl.add(TweenMax.to(hexagon, speed, params), placement);

			})
			matrixTl.add(lineTl.delay(lineDelay), linePosition);

		})
		return matrixTl.pause();

	}

	getWaveAnimation(rings, fill = '#071F3A', params = {
		transformOrigin: '50% 50%',
		yoyo: true,
		fill,
		ease: Sine.easeInOut,
		repeat: 1,
		scale: -1

	}) {
		let amplitude = 1.2,
			frequency = 40,
			segments = rings.length * 40,
			waveTl = new TimelineMax({repeat: -1});

		rings.forEach((layer, index) => {
			let norm = index / segments;
			waveTl.to(layer, 2, params, norm * frequency);
		})

		return waveTl.addLabel('wave-animation').pause(0);
	}

	pOnRef(ref) {
		console.log(ref);
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
			return (<path key={i} id={id} transform={transforms} className='outerHexagon' ref={pRef} d="M26 22.4v-15L13 0 0 7.5v15L13 30l13-7.6"/>)
		})

	}

	render() {
		let {hexagonsAttrs} = this.state;
		return (
			<svg ref="hexcontainer" className='hexcontainer' id="main" viewBox={this.props.viewBox}>

				<g className='hexagons' transform='translate(1,-10)'>
					{this.renderHexagons(hexagonsAttrs)}
				</g>

				<g ref='refreshPaneContainer' className='refresh-pane-container'>
					<rect ref='refreshPane' className='refresh-pane'></rect>
				</g>
			</svg>
		)
	}
}
