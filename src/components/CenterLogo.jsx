import React, {PropTypes} from 'react';
import DefineGlasses from 'Glasses';
import {TimelineMax, Bounce, Back} from "gsap/src/minified/TweenMax.min";
import DrawSVGPlugin from 'DrawSVGPlugin';
import {mobileCheck, removeTlAnimation} from 'utils';

export default class CenterLogo extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			g: null,
			glassesPos: 'LeftOne'
		}

		this.portraitGyro = this.portraitGyro.bind(this);
		this.mouseMovement = this.mouseMovement.bind(this);

		window.mobileCheck = mobileCheck;
		if (window.mobileCheck()) {
			window.addEventListener('deviceorientation', this.portraitGyro, true);
		} else {
			window.addEventListener('mousemove', this.mouseMovement, true);
		}

		this.updateAnimations = this.updateAnimations.bind(this);
		this.getFloatAnimation = this.getFloatAnimation.bind(this);
		this.getBounceAnimation = this.getBounceAnimation.bind(this);

	}

	componentDidMount() {
		setTimeout(() => this.updateAnimations(), 300);
	}

	componentWillReceiveProps(nextProps) {}

	shouldComponentUpdate() {
		return true;
	}

	componentWillUnmount() {
		window.removeEventListener('deviceorientation', this.portraitGyro, true);
		window.removeEventListener('mousemove', this.mouseMovement, true);

		removeTlAnimation(this.bounceAnimation);
		removeTlAnimation(this.floatAnimation);
		this.bounceAnimation = null;
		this.floatAnimation = null;

	}

	portraitGyro(e) {
		let pos = 'Front';

		if (e.gamma < 20 && e.gamma > -20) {
			pos = 'Front';
		}
		if (e.gamma < 30 && e.gamma > 21) {
			pos = 'RightOne';
		}
		if (e.gamma < 40 && e.gamma > 31) {
			pos = 'RightTwo';
		}
		if (e.gamma < 50 && e.gamma > 41) {
			pos = 'RightThree';
		}
		if (e.gamma < -21 && e.gamma > -30) {
			pos = 'LeftOne';
		}
		if (e.gamma < -31 && e.gamma > -40) {
			pos = 'LeftTwo';
		}
		if (e.gamma < -41 && e.gamma > -50) {
			pos = 'LeftThree';
		}
		if (e.beta < 40) {
			pos = 'TopOne';
		}
		if (e.beta < 30) {
			pos = 'TopTwo';
		}
		if (e.beta < 20) {
			pos = 'TopThree';
		}
		if (e.beta > 90) {
			pos = 'BottomOne';
		}
		if (e.beta > 100) {
			pos = 'BottomTwo';
		}
		if (e.beta > 110) {
			pos = 'BottomThree';
		}

		this.setState({
			...this.state,
			glassesPos: pos
		});
	}

	getBounceAnimation() {
		let elements = [
			this.outline1,
			this.outline2,
			this.outline3,
			this.outline4,
			this.outline5,
			this.outline6
		];

		let params = {
			transformOrigin: '50% 50%',
			scale: .8,
			ease: Bounce.easeOut,
			repeat: 1,
			yoyo: true
		}
		let bounceTl = new TimelineMax({repeat: -1});

		return bounceTl.staggerTo(elements, 1.5, params, .2).addLabel('bounce-outlines').pause(0);

	}

	updateAnimations() {
		this.bounceAnimation = this.getBounceAnimation();
		this.floatAnimation = this.getFloatAnimation();

		this.floatAnimation.play();
		this.bounceAnimation.play();
	}

	getFloatAnimation() {
		let floatTl = new TimelineMax({repeat: -1});
		let params = {
			y: -10,
			repeat: 1,
			yoyo: true
		}

		floatTl.to(this.glassesTotal, 2, params).addLabel('glasses-float');
		return floatTl.pause(0);
	}

	mouseMovement(e) {
		let pos = 'Front',
			tW = window.innerWidth,
			tH = window.innerHeight;

		if (e.screenX < (tW * .64) && e.screenX > (tW * .46)) {
			pos = 'Front';
		}
		if (e.screenX < (tW * .45) && e.screenX > (tW * .31)) {
			pos = 'LeftOne';
		}
		if (e.screenX < (tW * .30) && e.screenX > (tW * .15)) {
			pos = 'LeftTwo';
		}
		if (e.screenX < (tW * .14) && e.screenX > 0) {
			pos = 'LeftThree';
		}
		if (e.screenX < (tW * .78) && e.screenX > (tW * .65)) {
			pos = 'RightOne';
		}
		if (e.screenX < (tW * .92) && e.screenX > (tW * .79)) {
			pos = 'RightTwo';
		}
		if (e.screenX < (tW) && e.screenX > (tW * .93)) {
			pos = 'RightThree';
		}
		if (e.screenY > (tH * .60)) {
			pos = 'BottomOne';
		}
		if (e.screenY > (tH * .75)) {
			pos = 'BottomTwo';
		}
		if (e.screenY > (tH * .85)) {
			pos = 'BottomThree';
		}
		if (e.screenY < (tH * .45)) {
			pos = 'TopOne';
		}
		if (e.screenY < (tH * .35)) {
			pos = 'TopTwo';
		}
		if (e.screenY < (tH * .25)) {
			pos = 'TopThree';
		}

		this.setState({
			...this.state,
			glassesPos: pos
		});

	}

	render() {
		return (
			<div className="row center-logo click-through">
				<div className="col-sm-6 col-sm-offset-3 center-logo-content">
					<div></div>
					<svg id="center-logo-svg" viewBox="0 0 292.2 333.9" ref={this.onRef}>
						<g id="logo-outline">
							<g id="glasses-total" ref={ref => this.glassesTotal = ref}>
								<DefineGlasses position={this.state.glassesPos} transformation={'translate(50, 120)'}/>
							</g>
							<path d="M226.8 51.3l57.4 33a5.8 5.8 0 0 1 2.5 4.4V173l5.5-3.6V88.6a11.2 11.2 0 0 0-5.2-9l-56.2-32.3z" ref={ref => this.outline3 = ref} className="white-outlines"/>
							<path d="M5.5 172.5V88.7A5.8 5.8 0 0 1 8 84.4l55.3-32-5-3.5-53 30.6a11.2 11.2 0 0 0-5.3 9v87.8z" ref={ref => this.outline1 = ref} className="other-outlines"/>
							<path d="M82 41.6L143.7 6a5.8 5.8 0 0 1 5 0l60.3 35 4-4-61.7-35.7a11.2 11.2 0 0 0-10.4 0L77 38z" ref={ref => this.outline2 = ref} className="colored-outlines"/>
							<path d="M286.6 196.5v48.8a5.8 5.8 0 0 1-2.4 4.2l-55.8 32.3 1.2 5.7 57.4-33.2a11.2 11.2 0 0 0 5.2-9V193z" ref={ref => this.outline4 = ref} className="other-outlines"/>
							<path d="M210.2 292.3l-61.6 35.5a5.8 5.8 0 0 1-5 0l-65.3-37.6 1.5 7.2 61 35.3a11.2 11.2 0 0 0 10.5 0l60-34.7z" ref={ref => this.outline5 = ref} className="colored-outlines"/>
							<path d="M55.2 276.8L8 249.5a5.8 5.8 0 0 1-2.5-4.2V197L0 201v44.3a11.2 11.2 0 0 0 5.2 9L56.7 284z" ref={ref => this.outline6 = ref} className="white-outlines"/>
							<text className="logo-text" transform="translate(31.89 237.25)">
								&lt;/<tspan x="51" y="0" className="logo-name">viera.io</tspan>
								<tspan x="206.6" y="0" className="e">&gt;</tspan>
							</text>
						</g>
					</svg>
				</div>
			</div>
		)
	}

}
