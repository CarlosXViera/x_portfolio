import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';
import {CSSTransitionGroup} from 'react-transition-group';
import {Transition} from 'Transitions';
import Waypoint from 'react-waypoint';
import {TimelineMax, TweenLite, Bounce} from 'gsap';
import DrawSVGPlugin from 'DrawSVGPlugin';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.swipeAnimation = new TimelineMax();
		this.state = {
			hover: false
		}
	}

	handleHover() {
		this.setState({hover: true});
	}
	componentDidMount() {}

	handleSwiperEnter() {
		this.swipeAnimation.play()
	}

	handleSwipeLeave() {
		this.swipeAnimation.reverse();
	}

	componentDidMount() {
		TweenMax.to([
			this.refs.swiper, this.refs.swipePhone
		], 0, {
			opacity: 0,
			drawSVG: '0%'
		});

		let swiper = this.refs.swiper,
			phone = this.refs.swipePhone;

		this.swipeAnimation.to([
			swiper, phone
		], 1, {
			transformOrigin: '50%, 50%',
			opacity: 1,
			drawSVG: '100%'
		}).to(swiper, 1, {
			transformOrigin: '50%, 50%',
			scale: 1.2,
			y: -60,
			opacity: 0,
			repeat: -1
		}).pause();
	}

	render() {
		return (
			<Transition settings={{
				time: 300,
				transition: 'slide-up'
			}}>
				<div key={this.props.location.key} className="col-sm home-content click-through-child">
					<CenterLogo className="click-through click-through-child"/>
					<MediaIcons onHover={this.handleHover.bind(this)}/>
					<div className="swipe-container click-through-child">
						<svg className="click-through-child" className="swipe" viewBox="0 0 43 75">
							<circle ref="swiper" cx="21.5" cy="60.5" r="9.5"/>
							<rect ref="swipePhone" width="42" height="74" x=".5" y=".5" rx="5" ry="5"/>
						</svg>
					</div>
					<Waypoint className="click-through-child" onEnter={(this.handleSwiperEnter.bind(this))} onLeave={this.handleSwipeLeave.bind(this)}>
						<div className='end-page'></div>
					</Waypoint>
				</div>
			</Transition>
		)
	}
}
