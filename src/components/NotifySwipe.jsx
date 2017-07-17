import React, {PropTypes} from 'react';
import {handleSwipeUp, handleSwipeDown} from 'utils';
import Waypoint from 'react-waypoint';
import {TimelineMax, TweenLite, Bounce} from 'gsap';
import DrawSVGPlugin from 'DrawSVGPlugin';

export default class NofiySwipe extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			swipe: window.mobileCheck()

		}

		console.log();
		this.swipeAnimation = new TimelineMax();
		this.mouseScrollAnimation = new TimelineMax();

	}

	handleSwiperEnter() {
		this.swipeAnimation.restart()
		this.state.swipe
			? ''
			: this.mouseScrollAnimation.restart();
	}

	animateSwipe() {
		let swiper = this.refs.swiper,
			phone = this.refs.swipePhone;

		TweenMax.to([
			swiper, phone
		], 0, {
			opacity: 0,
			drawSVG: '0%'
		});

		this.swipeAnimation.to([
			swiper, phone
		], 2, {
			transformOrigin: '50%, 50%',
			opacity: 1,
			drawSVG: '100%'
		}).to(swiper, 1, {
			transformOrigin: '50%, 50%',
			scale: 1.2,
			y: -60,
			opacity: 0,
			repeat: 4
		}).to([
			swiper, phone
		], 1, {
			opacity: 0,
			drawSVG: '0'
		});
	}

	animateScroll() {

		let mouse = this.refs.mouse;
		let circle1 = this.refs.circle1;
		let circle2 = this.refs.circle2;
		let circle3 = this.refs.circle3;

		TweenMax.to(mouse, 0, {
			transformOrigin: '50%, 50%',
			opacity: 0,
			drawSVG: '0%'
		});

		TweenMax.to([
			circle1, circle2, circle3
		], 0, {opacity: 0});

		this.swipeAnimation.to(mouse, 1, {
			opacity: 1,
			drawSVG: '100%'
		})

		this.mouseScrollAnimation.to(circle1, .2, {
			transformOrigin: '50%, 50%',
			opacity: 1,
			scale: 1.2,
			repeat: 1,
			yoyo: true
		}).to(circle2, .2, {
			transformOrigin: '50%, 50%',
			opacity: 1,
			scale: 1.2,
			repeat: 1,
			yoyo: true
		}).to(circle3, .2, {
			transformOrigin: '50%, 50%',
			opacity: 1,
			scale: 1.2,
			repeat: 1,
			yoyo: true
		}).repeat(3).eventCallback('onComplete', () => {
			TweenMax.to(mouse, 1, {
				drawSVG: '0%',
				opacity: 0
			})
		})
	}

	componentDidMount() {

		this.state.swipe
			? this.animateSwipe()
			: this.animateScroll();

	}

	handleSwipeLeave() {}

	renderNotification(scroll) {
		return scroll
			? (
				<svg className="click-through-child" className="swipe" viewBox="0 0 43 75">
					<circle ref="swiper" cx="21.5" cy="60.5" r="9.5"/>
					<rect ref="swipePhone" width="42" height="74" x=".5" y=".5" rx="5" ry="5"/>
				</svg>
			)
			: (
				<svg className="click-through-child" className="scroll" viewBox="0 0 42.73 70.49">
					<rect ref='mouse' width="42.23" height="69.99" x=".25" y=".25" rx="17.5" ry="17.5"/>
					<g >
						<circle ref='circle1' cx="21.37" cy="20.74" r="1.63"/>
						<circle ref='circle2' cx="21.37" cy="26.9" r="1.63"/>
						<circle ref='circle3' cx="21.37" cy="33.06" r="1.63"/>
					</g>
				</svg>
			)

	}

	render() {
		return (
			<div className='boom'>
				<Waypoint className="click-through-child" onEnter={(this.handleSwiperEnter.bind(this))} onLeave={this.handleSwipeLeave.bind(this)}>
					{this.renderNotification(this.state.swipe)}
				</Waypoint>
			</div>
		);
	}
}
NofiySwipe.propTypes = {};
