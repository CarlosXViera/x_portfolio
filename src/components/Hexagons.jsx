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
		console.log('mounting');
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

				translate = vHexagons % 2 ? `${calculatedHSpacing}, ${calculatedVSpacing}` :
					`${calculatedHSpacing + offset}, ${calculatedVSpacing}`;

				translatedHexagon = selection.append('g')
					.attr('id', `${vHexagons}${hHexagons}`)
					.attr('transform',`translate(${translate})`);

				translatedHexagon.html(templateHexagon);

				translatedHexagon.select('polygon')
				.attr('class','hexagon').on('click', function(d){
					console.log(this.parentNode)
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


			let x = start.x;
			let y = start.y;
			let fn = (direction === 'right') ? addRight : addLeft;

			for(let j = 0; j < times; j++){
				let r = fn([y,x]);
				y = r.y;
				x = r.x;

				arr[y][x].attr('stroke', 'yellow');
				console.log(y,x);
			}
		}

		function isEven(n){
			return (n % 2 === 0);
		}

		/* multiply these amounts by the amount of layers. */
		let topBtmAmount = 2;
		/* default to one, add two. Must account for layers that are btwn middle and t/b */
		let layers = 3;
		let isTopDone = false;
		let isBtmDone = false;
		let hexArr = this.hexagonArray;
		let rings = 1;
 		let nextLayer;
		let coords = {
			y: Math.round(hexArr.length / 2),
			x: Math.round(hexArr[0].length / 2)
		}
		// even add to x odd do nothing;
		//let topLayer = (isEven(coords.y)) ?

		hexArr[coords.y][coords.x].attr('stroke', 'black');

		let isRowEven = !isEven(coords.y);

		for(let i = 0; i < rings; i++){
			let topLayer = null;
			let level = i + 1;
			for(let j = 0; j < layers; j++){
				if(isTopDone === false){
					/* if it's odd add to the right. if it's even add 1 to x, then add to the right */
						console.log(isEven(i), i)
						topLayer = (isEven(i)) ? {y:coords.y - level, x:coords.x + level} : {y:coords.y - level, x:coords.x + level};
						nextLayer = {
							y: topLayer.y + 1,
							x: topLayer.x
						};
						chooseHex(topLayer, 'left', topBtmAmount, hexArr);
						isTopDone = true;
				} else if(isBtmDone === false){
					/* if it's odd add to the right. if it's even add 1 to x, then add to the right */
					let bottomLayer = {y: topLayer.y + (layers - 1), x: topLayer.x}
					chooseHex(bottomLayer, 'left', topBtmAmount, hexArr);
					isBtmDone = true;
				} else if(isTopDone && isBtmDone){
					/* both top and bottom are done. */
					/* check if y-coordinate is odd. */
					let startPoint = nextLayer;
					startPoint.x--
					chooseHex(startPoint, 'left', 1, hexArr);
					chooseHex(startPoint, 'right', 1, hexArr);
					startPoint.y++;
					nextLayer = startPoint;

				}
			}
			/* change values here */
			layers += 2;
			topBtmAmount++;
			isTopDone = false;
			isBtmDone = false;

		}

	}

	renderHexagons(props){
		this.hexagonArray = this.generateData(this.state.g, window.innerWidth, window.innerHeight);

		this.selectHexagons();
}

componentDidMount(){
	console.log('did Mount');
	console.log(document.getElementById('1630'))
}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
