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

	componentDidMount() {
		console.log(this.refs.menuButton);
		console.log(this.refs.exitButton);

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
					<h3>&#x2716;</h3>
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
