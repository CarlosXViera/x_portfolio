import React, {PropTypes} from 'react'
import {selection, select, events} from 'd3-selection';
import {importTemplates} from 'utils'
import uuid from 'node-uuid'

export default class Hexagons extends React.Component {
	constructor(props) {
		super(props)

		this.el = importTemplates(['originalHex']);

		this.colors = ['#343838', '#005F6B', '#008C9E', '00B4CC', '#00DFFC'];

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

	componentWillMount() {
	}

	shouldComponentUpdate() {
		return false;
	}

	generateData(selection, width, height){
		const hSize = 15;
		const hAmount = Math.floor(width / (hSize + 4));
		const vAmount = Math.floor(height / (hSize + 4));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
		const hSpacing = 12;
		const vSpacing = 8;
		const offset = -13.5;

		let templateHexagon = this.el.originalHex;
		let hCollection = [];
		let count = 0;

		for(let vHexagons = 0; vHexagons < vAmount; vHexagons++){
			let row = [],
				translate,
				translatedHexagon;

			for(let hHexagons = 0; hHexagons < hAmount; hHexagons++){
				let calculatedHSpacing = (hSize + hSpacing) * hHexagons,
					calculatedVSpacing = (hSize + vSpacing) * vHexagons;

				translate = vHexagons % 2 === 0 ? `${calculatedHSpacing}, ${calculatedVSpacing}` :
					`${calculatedHSpacing + offset}, ${calculatedVSpacing}`;

				translatedHexagon = selection.append('g')
					.attr('id', `${vHexagons}${hHexagons}`)
					.attr('transform',`translate(${translate})`);

				translatedHexagon.html(templateHexagon);

				translatedHexagon.select('polygon')
				.attr('class','hexagon').on('click', function(d){
					select(this).attr('stroke', 'yellow');
				});

				row.push(translatedHexagon);

				count++
			}
			hCollection.push(row);
		}

		return hCollection;
	}

	selectHexagons(){

		function chooseHex(start, direction, times, arr){

			function addLeft(arr){
				return {
					y: arr[0],
					x: arr[1] - 1
				}
			}

			function addRight(arr){
				return {
					y: arr[0],
					x: arr[1] + 1
				}
			}

			let x = start.x,
				y = start.y,
				fn = (direction === 'right') ? addRight : addLeft;
				arr[start.y][start.x].attr('stroke', 'yellow');
				let coll = {right: start}

			for(let j = 1; j < times; j++){
				let r = fn([y,x]);
				y = r.y;
				x = r.x;
				arr[y][x].attr('stroke', 'yellow');
				if(j === times - 1) coll['left'] = {y, x};
			}

			return coll;
		}

		function isEven(n){
			return (n % 2 === 0);
		}

		function adjust(obj, direction, adj){
			return (direction === 'r') ? {x: obj.x + adj, y: obj.y} : {x: obj.x - adj, y: obj.y}
		}

		/* multiply these amounts by the amount of layers. */
		let topBtmAmount = 2;
		/* default to one, add two. Must account for layers that are btwn middle and t/b */
		let layers = 3;
		let isTopDone = false;
		let isBtmDone = false;
		let hexArr = this.hexagonArray;
		let rings = 30;
		let coords = {
			y: Math.floor(hexArr.length / 2),
			x: Math.floor(hexArr[0].length / 2)
		}
		let origin = coords;
		let leftSide = [];
		let rightSide = [];


		hexArr[coords.y][coords.x].attr('stroke', 'red');

		for(let i = 0; i < rings; i++){
			let topLayer = {},
				level = i + 1;

			if(isEven(origin.y)){
				topLayer['y'] = origin.y - 1;
				topLayer['x'] = origin.x + 1;
			} else {
				topLayer['y'] = origin.y - 1;
				topLayer['x'] = origin.x;
			}

			let bottomLayer = {
				...topLayer
			}
			bottomLayer.y += (layers - 1);

			for(let j = 0; j < layers; j++){
				if(isTopDone === false){
						isTopDone = true;
						if(topLayer.y < 0) continue;
						let sides = chooseHex(topLayer, 'left', topBtmAmount, hexArr);
					/* if it's odd add to the right. if it's even add 1 to x, then add to the right */
						leftSide.push(sides.left);
						rightSide.push(sides.right);
				} else if(isBtmDone === false){
					isBtmDone = true;
					/* if it's odd add to the right. if it's even add 1 to x, then add to the right */
					if(bottomLayer.y > hexArr.length -1) continue;
					let sides = chooseHex(bottomLayer, 'left', topBtmAmount, hexArr);
					leftSide.push(sides.left);
					rightSide.push(sides.right);
				} else if(isTopDone && isBtmDone){
					if(level === 1){
						let adjustedleft = adjust(origin, 'l', 1);
						let adjustedright = adjust(origin, 'r', 1);
						let left = chooseHex(adjustedleft, 'right', 1, hexArr).right;
						let right = chooseHex(adjustedright, 'right', 1, hexArr).right;
						rightSide.push(right);
						leftSide.push(left);
						break;
					}
					let rmr = rightSide.splice(rightSide.length - 2, 2);
					let rml = leftSide.splice(leftSide.length - 2, 2);
					rightSide = rightSide.map((obj) => {
						let adjusted = adjust(obj, 'r', 1);
						chooseHex(adjusted, 'right', 1, hexArr)
						return adjusted;
					});

					leftSide = leftSide.map((obj) => {
						let adjusted = adjust(obj, 'l', 1);
						chooseHex(adjusted, 'left', 1, hexArr)
						return adjusted;
					});

					rightSide = rightSide.concat(rmr);
					leftSide = leftSide.concat(rml);
					break;

					/* both top and bottom are done. */
					/* check if y-coordinate is odd. */
				}

			}
			/* change values here */
			origin = topLayer;
			isTopDone = false;
			isBtmDone = false;
			topBtmAmount++;
			layers += 2;
		}
	}

	renderHexagons(props){
		this.hexagonArray = this.generateData(this.state.g, window.innerWidth, window.innerHeight);

		this.selectHexagons();
}

componentDidMount(){

}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
