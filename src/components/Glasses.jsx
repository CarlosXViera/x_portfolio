import React, {PropTypes} from 'react'
import {importTemplates} from 'utils'

export default class Glasses extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			g: null
		}

		this.el = importTemplates([
			'front',
			'left1',
			'left2',
			'left3',
			'right1',
			'right2',
			'right3',
			'top1',
			'top2',
			'top3',
			'bottom1',
			'bottom2',
			'bottom3'
		]);

		window.addEventListener('deviceorientation', this.sprite.bind(this), true);

	}

	shouldComponentUpdate() {
		return false;
	}

	onRef = (ref) => {
		this.setState({
			g: d3.select(ref)
		}, () => this.renderGlasses(this.props.orientation))
	}

	componentWillReceiveProps(nextProps) {
		this.renderGlasses(nextProps.orientation)
	}

	renderGlasses(orientation) {
		this.state.g.html(this.el.bottom1);
		let xCoord, yCoord;
		if(orientation === 'landscape'){
			this.state.g.attr('transform', 'translate(420, 300)')
			xCoord = 420;
			yCoord = 300;
			this.float(this.state.g, xCoord, yCoord, false, this.showUpDown);
		}else {
			this.state.g.attr('transform', 'translate(130, 420)')
			xCoord = 130;
			yCoord = 420;
			this.float(this.state.g, xCoord, yCoord, false, this.showUpDown);
		}
	}

	showUpDown(sel, numX, numY) {
		//have to keep translated x value constant
		return sel.transition('updown').attr('transform', `translate(${numX}, ${numY})`).duration(1500).ease(d3.easeSinOut);
	}

	float(sel, xCoord, yCoord, toggling, callback) {
		let self = this;
		if (toggling) {
			callback(sel, xCoord, yCoord).on('end', () => self.float(sel, xCoord, yCoord, !toggling, callback));
		} else {
			callback(sel, xCoord, (yCoord - 50)).on('end', () => self.float(sel, xCoord, yCoord, !toggling, callback))
		}
	}

	sprite(e) {
		if (e.gamma < 20 && e.gamma > -20) {
			this.state.g.html(this.el.front);
		}
		if (e.gamma < 30 && e.gamma > 21) {
			this.state.g.html(this.el.left1);
		}
		if (e.gamma < 40 && e.gamma > 31) {
			this.state.g.html(this.el.left2);
		}
		if (e.gamma < 50 && e.gamma > 41) {
			this.state.g.html(this.el.left3);
		}
		if (e.gamma < -21 && e.gamma > -30) {
			this.state.g.html(this.el.right1);
		}
		if (e.gamma < -31 && e.gamma > -40) {
			this.state.g.html(this.el.right2);
		}
		if (e.gamma < -41 && e.gamma > -50) {
			this.state.g.html(this.el.right3);
		}
		if (e.beta < 40) {
			this.state.g.html(this.el.top1);
		}
		if (e.beta < 30) {
			this.state.g.html(this.el.top2);
		}
		if (e.beta < 20) {
			this.state.g.html(this.el.top3);
		}
		if (e.beta > 90) {
			this.state.g.html(this.el.bottom1)
		}
		if (e.beta > 100) {
			this.state.g.html(this.el.bottom2)
		}
		if (e.beta > 110) {
			this.state.g.html(this.el.bottom3)
		}
	}

	render() {
		return (<g className='glasses' ref={this.onRef}/>)
	}

}
