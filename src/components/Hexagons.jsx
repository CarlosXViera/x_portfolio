import React, {PropTypes} from 'react'
import {importTemplates} from 'utils'
import uuid from 'node-uuid'
import {TimelineMax} from 'gsap';
import {CSSTransitionGroup} from 'react-transition-group';

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		let data = this.generateData(this.state.g, window.innerWidth + 50, window.innerHeight + 35);

		this.state = {
			...data
		}

	}

	state = {
		g: null
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

	getHexagonElement(hexCoords) {
		return this.hexagonCubeArray[`${hexCoords.x} ${hexCoords.y} ${hexCoords.z}`].translatedHexagon;

	}

	getHexagonCubicCoords() {
		return this.hexagonCubeArray[`${hexCoords.x} ${hexCoords.y} ${hexCoords.z}`].cubeCoords;

	}

	createHexagonElement({id, transforms, gRef, pRef}) {
		return () => {
			return (
				<g id={id} ref={gRef}>
					<polygon transform={transforms} ref={pRef} points="11.8 9.42 11.8 -5.48 11.8 -5.48 -1.19 -13 -14.19 -5.48 -14.19 9.42 -1.19 17 11.8 9.42"></polygon>
				</g>
			)
		}
	}

	getHexagonData(row, col, t) {
		let hexId = `${row}${col}`;
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

	generateData(selection, width, height) {
		const hSize = 15;
		const hSpacing = 12.5;
		const vSpacing = 8.5;
		const hAmount = Math.floor(width / (hSize + hSpacing));
		const vAmount = Math.floor(height / (hSize + vSpacing));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
		const offset = -13.5;
		let hexagonsAttrs = [];
		let hexagonMap = [];
		let cubeCoordinates = {};
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

				translatedHexagon = this.getHexagonData(hHexagons, vHexagons, `translate(${translate})`);
				cubeCoords = this.offsetToCubeCoords(translatedHexagon.offsetCoords);

				cubeCoordinates[`${cubeCoords.x} ${cubeCoords.y} ${cubeCoords.z}`] = cubeCoords;
				hexagonsAttrs.push(translatedHexagon);
				row.push(translatedHexagon);
			}
			hexagonMap.push(row);
		}

		return {hexagonMap, cubeCoordinates, hexagonsAttrs};
	}

	renderHexagons(attrs) {
		return attrs.map(({
			id,
			gRef,
			transforms,
			pRef
		}, i) => {
			return (
				<g key={i} id={id} ref={gRef}>
					<polygon className="hexagon" transform={transforms} ref={pRef} points="11.8 9.42 11.8 -5.48 11.8 -5.48 -1.19 -13 -14.19 -5.48 -14.19 9.42 -1.19 17 11.8 9.42"></polygon>
				</g>
			)
		})

	}

	render() {
		let {hexagonsAttrs} = this.state;
		return (
			<g className='hexagons'>
				{this.renderHexagons(hexagonsAttrs)}
			</g>
		)
	}
}
