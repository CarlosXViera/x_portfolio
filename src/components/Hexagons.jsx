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
		function addHex(i, a, cb, hexArr){
			let length = i;
			let y = a[0];
			let x = a[1];

			for(let j = 0; j < length; j++){
				let r = cb([y,x]);
				y = r.y;
				x = r.x;
				hexArr[y][x].attr('stroke', 'yellow');
			}
		}

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
		// change the top after going through the sequence.
		let yCoord = this.hexagonArray.length / 2;
		let xCoord = this.hexagonArray[0].length / 2;
		let isRowEven = (yCoord % 2) ? true : false;
		let topHex = yCoord;
		let btmHex = yCoord;
		let topDone = false;
		let btmDone = false;
		let newX;
		let origin = [ this.hexagonArray[yCoord][xCoord] ];
		let maxSize = this.hexagonArray[0].length;
		let totalNodes = this.hexagonArray.length * maxSize;
		let currentCount = 3;
		let tbAmount = 2;
		let sideAmount = 2;

		newX = !isRowEven ? ++xCoord : xCoord;
		while(currentCount > 0){

			console.log(newX);

			if(topDone === false){
				let a = [topHex - 1, newX];
			 	addHex(tbAmount, a, addLeft, this.hexagonArray);
				topDone = true;
			} else if(btmDone === false){
				let a = [topHex + 1, newX];
				addHex(tbAmount,a, addLeft, this.hexagonArray);
				btmDone = true;
			} else if(topDone && btmDone){
				let a = [topHex, --newX];
				addHex(1, a, addLeft, this.hexagonArray);
				addHex(1, a, addRight, this.hexagonArray);

				console.log('top and bottom are done!');
			}

			currentCount--;
		}

		isRowEven = !isRowEven;
		topDone = !topDone;
		btmDone = !btmDone;
	}

	renderHexagons(props){

		let selected = [
			{y:24,x:32}
		]

		this.hexagonArray = this.generateData(this.state.g, window.innerWidth, window.innerHeight);

		selected.forEach(n => {
			this.hexagonArray[n.y][n.x].attr('stroke', 'yellow');
		});

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
