import React, {PropTypes} from 'react'
import {selection, select} from 'd3-selection';
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
		const hSpacing = 12;
		const vSpacing = 9;
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

				translatedHexagon = selection.append('g').attr('id', count).attr('transform',`translate(${translate})`);
				translatedHexagon.html(templateHexagon);
				row.push(translatedHexagon);

				count++
			}
			hCollection.push(row);
		}

		return hCollection;
	}

	renderHexagons(props){

		let size = this.generateData(this.state.g, window.innerWidth, window.innerHeight);
		this.state.g.append('g').html(this.el.originalHex);

		console.log(size);
}

	render() {
		return (<g className='hexagons' ref={this.onRef}/>)
	}
}
