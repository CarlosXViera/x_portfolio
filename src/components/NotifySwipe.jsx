import React, {PropTypes} from 'react';
import {handleSwipeUp, handleSwipeDown} from 'utils';
import Waypoint from 'react-waypoint';
import {TimelineMax, Bounce} from 'gsap/src/minified/TweenMax.min';
import DrawSVGPlugin from 'DrawSVGPlugin';

export default class NofiySwipe extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			swipe: window.mobileCheck()

		}

		this.swipeAnimation = new TimelineMax();
		this.mouseScrollAnimation = new TimelineMax();

	}

	handleSwiperEnter() {
		this.props.onSwipeable()
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
		}).fromTo(swiper, 1, {
			transformOrigin: '50%, 50%',

			x: 11,
			opacity: 0,
			yoyo: true,
			repeat: 4
		}, {
			transformOrigin: '50%, 50%',
			x: -11,
			opacity: 1,
			yoyo: true,
			repeat: 4
		}).to([
			swiper, phone
		], 1, {
			opacity: 0,
			drawSVG: '0'
		});
	}

	animateScroll() {
		let mouseTl = new TimelineMax();
		let {mouse, pointer} = this.refs;

		mouseTl.fromTo(mouse, 2, {
			drawSVG: '0%'
		}, {
			opacity: 1,
			drawSVG: '100%'
		})
		mouseTl.fromTo(pointer, 1, {
			x: -20
		}, {
			opacity: 1,
			x: 40
		});
		mouseTl.to(pointer, 1, {
			opacity: 0,
			x: -20
		});
		mouseTl.to(mouse, 1, {
			drawSVG: '0%',
			opacity: 0
		});
	}

	componentDidMount() {

		this.state.swipe
			? setTimeout(this.animateSwipe.bind(this), 300)
			: setTimeout(this.animateScroll.bind(this), 300);

	}

	handleSwipeLeave() {
		this.props.onUnSwipeable();
	}

	renderNotification(scroll) {
		let style = {
			opacity: '0'
		};
		return scroll
			? (
				<svg className="click-through-child" className="swipe" viewBox="0 0 75 75">
					<rect ref="swipePhone" width="42" height="74" x=".5" y=".5" rx="5" ry="5"/>
					<circle ref="swiper" cx="21.5" cy="37.5" r="9.5"/>
				</svg>
			)
			: (
				<svg transform='scale(3)' className="scroll" viewBox="0 0 70 42">
					<rect style={style} ref='mouse' width="68" height="40" x="1" y="1" rx="1" ry="1"/>
					<path style={style} ref='pointer' stroke='#FFF' fill='#FFF' d="M28.1 24l1.1 2.2a.6.6 0 0 1-.3.8l-.7.4a.6.6 0 0 1-.9-.3l-1-2c-.1-.2-.2-.2-.3 0l-1.1 1.1c-.1.1-.2.2-.4.1a.4.4 0 0 1-.2-.4v-3.2-4a.4.4 0 0 1 .2-.4.3.3 0 0 1 .4.1l1.5 1.6 1.3 1.3 2.1 2.1c.1.1.2.2.2.3a.4.4 0 0 1-.4.3h-1.5zm-3.5-1.7v3.4c0 .1 0 .2.1.2s.2-.1.2-.1l1-1c.4-.4.4-.4.7.1l1 2c.2.3.3.4.6.2l.5-.3c.4-.2.4-.3.2-.7l-1-2.1c-.2-.3-.1-.4.2-.4h1.2c.1 0 .3 0 .3-.1s-.1-.2-.2-.3l-3.7-3.6-.9-.9c-.1-.1-.1-.2-.3-.1s-.1.2-.1.3.2 2.3.2 3.5z"/>
				</svg>
			)

	}

	render() {
		return (
			<div className='notify-swipe'>
				<Waypoint className="click-through-child" onEnter={(this.handleSwiperEnter.bind(this))} onLeave={this.handleSwipeLeave.bind(this)}>
					{this.renderNotification(this.state.swipe)}
				</Waypoint>
			</div>
		);
	}
}
NofiySwipe.propTypes = {};
