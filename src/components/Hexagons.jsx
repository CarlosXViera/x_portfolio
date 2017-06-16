import React, {PropTypes} from 'react'
import {selection, select, events} from 'd3-selection';
import {importTemplates} from 'utils'
import uuid from 'node-uuid'
import {TimelineMax} from 'gsap';

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
		const hSpacing = 12;
		const vSpacing = 8;
		const hAmount = Math.floor(width / (hSize + hSpacing));
		const vAmount = Math.floor(height / (hSize + vSpacing));
		/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
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

			let x = start.x, y = start.y,
				fn = (direction === 'right') ? addRight : addLeft;
			let t = [start];

				arr[start.y][start.x].attr('stroke', 'yellow');

			for(let j = 1; j < times; j++){
				let r = fn([y,x]);
				y = r.y;
				x = r.x;
				arr[y][x].attr('stroke', 'yellow');
				t.push({y, x});
			}
			return {start, end: {y,x}, t};
		}

		function isEven(n){
			return (n % 2 === 0);
		}

		function adjust(obj, direction, adj){
			return (direction === 'r') ? {x: obj.x + adj, y: obj.y} : {x: obj.x - adj, y: obj.y};
		}

		function remap(arr, cb){
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
		let topBtmAmount = 2, layers = 3;
		let isTopDone = false, isBtmDone = false;
		let rings = 20;
		let leftSide = [], rightSide = [];
		let totalLayers = [];

		for(let i = 0; i < rings; i++){
			let t = [];
			let topLayer = (isEven(o.y)) ? {y: o.y - 1, x: o.x + 1} : {y: o.y - 1,x: o.x},
				level = i + 1,
				bottomLayer = Object.assign({}, topLayer);
			bottomLayer.y += (layers - 1);

			for(let j = 0; j < layers; j++){
				if(isTopDone === false){
						isTopDone = true;
						if(topLayer.y < 0) topLayer.y = 0;
						let sides = chooseHex(topLayer, 'left', topBtmAmount, hexArr);
						leftSide.push(sides.end);
						rightSide.push(sides.start);
						t = [...t, ...sides.t];
				} else if(isBtmDone === false){
					isBtmDone = true;
					if(bottomLayer.y > hexArr.length - 1) bottomLayer.y = hexArr.length - 1;
					let sides = chooseHex(bottomLayer, 'left', topBtmAmount, hexArr);
					leftSide.push(sides.end);
					rightSide.push(sides.start);
					t = [...t, ...sides.t];
				} else if(isTopDone && isBtmDone){
					if(level === 1){
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
						let adjusted = adjust(obj, 'r', 1);
						let sides = chooseHex(adjusted, 'right', 1, hexArr)
						t = [...t, ...sides.t];
						return adjusted;
					});

					leftSide = remap(leftSide, (obj) => {
						let adjusted = adjust(obj, 'l', 1);
						let sides = chooseHex(adjusted, 'left', 1, hexArr)
							t = [...t, ...sides.t];
						return adjusted;
					});
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
		totalLayers[14].forEach((obj)=>{
			hexArr[obj.y][obj.x].attr('stroke', 'red');

		})
		return totalLayers;
	}

	renderHexagons(props){
		console.log(select('svg').node().getBoundingClientRect().width);
		console.log(window.innerWidth)
		this.hexagonArray = this.generateData(this.state.g, 1600,900 );


		this.layers = this.selectHexagons();


		this.layers.forEach((obj,i)=>{
			obj.forEach((obj2) => {
				let node = this.hexagonArray[obj2.y][obj2.x].node();


				let tl = new TimelineMax();
				tl.to(node.children[0], 1, {scale: i * .02, repeatDelay:.1 * i, repeat:-1, yoyo:true});

			})
		})
}

componentDidMount(){

}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
