import React, {PropTypes} from 'react';
import {TimelineMax, Bounce} from 'gsap';

export default class NavButton extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			exitButton: null,
			menuButton: null
		}

	}

	onRefExitButton(ref) {
		if (ref !== null) {
			let tl = new TimelineMax();
			tl.from(ref, .4, {
				transformOrigin: '50% 50%',
				scale: 0,
				opacity: 1,
				repeat: 0,
				delay: 0,
				ease: Bounce.easeInOut
			})
		}

	}

	renderMenuButton(show) {
		return show
			? (
				<div className='exit-button' ref={this.onRefExitButton}>
					<svg id='x-button' viewBox="0 0 192.4 192.4"><path d="M147.5 192.4l-51.3-51-51 51L0 147l51.3-50.8L0 45.2 45.3 0l51 51 51.2-51 45 45-51 51 51 51z"/></svg>
				</div>
			)
			: (
				<div className="nav-button" ref="menuButton">
					<div className="nav-divider"></div>
					<div className="nav-divider"></div>
					<div className="nav-divider"></div>
					<div className="nav-divider"></div>
				</div>
			);
	}

	render() {
		return (
			<div className="col-sm-2 col-sm-offset-5 nav-button-container" onClick={this.props.onClick}>
				{this.renderMenuButton(this.props.show)}
			</div>
		)
	}
}
