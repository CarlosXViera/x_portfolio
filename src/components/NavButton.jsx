import React, {PropTypes} from 'react';
import {TimelineMax, Power4, Bounce} from 'gsap';

export default class NavButton extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			exitButton: null,
			menuButton: null
		}

		this.handleExitOnRef = this.handleExitOnRef.bind(this);
		this.getExitAnimation = this.getExitAnimation.bind(this);
		this.handleExitClick = this.handleExitClick.bind(this);
		this.handleSettingClick = this.handleSettingClick.bind(this);
		this.renderMenuButton = this.renderMenuButton.bind(this);
		this.handleSettingOnRef = this.handleSettingOnRef.bind(this);

	}

	componentDidMount() {}

	getSettingsAnimation(ref) {
		if (ref === null) {
			this.settingAnimation.kill().invalidate().clear().remove();
			delete this.settingAnimation;
			return;
		}

		let dividers = ref.children,
			settingsTl = new TimelineMax(),
			toParams = {
				transformOrigin: '50% 50%',
				x: -5,
				opacity: 0,
				ease: Power4.easeOut
			},
			fromParams = {
				transformOrigin: '50% 50%',
				x: 0,
				opacity: 1,
				ease: Power4.easeIn
			}

		settingsTl.staggerFromTo(dividers, .2, toParams, fromParams, .1).eventCallback('onReverseComplete', this.props.onShow);

		return settingsTl;
	}

	getExitAnimation(ref) {
		if (ref === null) {
			this.exitSettingAnimation.kill().invalidate().clear().remove();
			delete this.exitSettingAnimation;
			return;
		}

		let exitTl = new TimelineMax(),
			toParams = {
				transformOrigin: '50% 50%',
				scale: 1,
				opacity: 1,
				ease: Power4.easeOut
			},
			fromParams = {
				transformOrigin: '50% 50%',
				scale: 0,
				opacity: 0,
				ease: Power4.easeIn
			}

		exitTl.fromTo(ref, .4, fromParams, toParams).eventCallback('onReverseComplete', (s) => {
			this.props.onHide()
		})

		return exitTl;
	}

	handleExitClick() {

		this.exitSettingAnimation.reverse(0);
	}
	handleSettingClick() {
		this.settingAnimation.reverse(0);
	}
	handleExitOnRef(ref) {

		this.exitSettingAnimation = this.getExitAnimation(ref);
	}

	handleSettingOnRef(ref) {
		this.settingAnimation = this.getSettingsAnimation(ref);
	}

	renderMenuButton(show) {
		return show
			? (
				<div className='exit-button' onClick={this.handleExitClick}>
					<svg ref={this.handleExitOnRef} id='x-button' viewBox="0 0 192.4 192.4"><path d="M147.5 192.4l-51.3-51-51 51L0 147l51.3-50.8L0 45.2 45.3 0l51 51 51.2-51 45 45-51 51 51 51z"/></svg>
				</div>
			)
			: (
				<div className="nav-button" ref={this.handleSettingOnRef} onClick={this.handleSettingClick}>
					<div ref='div1' className="nav-divider"></div>
					<div ref='div2' className="nav-divider"></div>
					<div ref='div3' className="nav-divider"></div>
					<div ref='div4' className="nav-divider"></div>
				</div>
			);
	}

	render() {
		return (
			<div className="col-sm-2 col-sm-offset-5 nav-button-container">
				{this.renderMenuButton(this.props.show)}
			</div>
		)
	}
}
