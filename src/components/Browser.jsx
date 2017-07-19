import React, {PropTypes} from 'react';
import {select, selection} from 'd3-selection';
import FrontEndVisual from 'FrontEndVisual';
import BackEndVisual from 'BackEndVisual';
import DevOpsVisual from 'DevOpsVisual';
import {TimelineMax, TweenMax, Power4, Bounce} from 'gsap';
import DrawSVGPlugin from 'DrawSVGPlugin';
import Waypoint from 'react-waypoint';

export default class Browser extends React.Component {
	constructor(props) {
		super(props)

	}

	componentDidMount() {
		setTimeout(() => {
			this.browserAnimation = this.getBrowserAnimation();
		}, 300);

	}
	componentWillReceiveProps(nextProps) {}

	renderVisualization(vis) {
		switch (vis) {
			case 'front-end':
				return (<FrontEndVisual/>);
				break;
			case 'back-end':
				return (<BackEndVisual/>);
				break;
			case 'dev-ops':
				return (<DevOpsVisual/>);
				break;
			default:
				return (
					<g id="default-vis">
						<text fill="white" transform="translate(200, 200)">Default Visualisation</text>
					</g>
				);
		}

	}

	getBrowserAnimation() {
		let {
			browserMenuBar,
			filledTab,
			browserInnerWindow,
			browserScrollBar,
			exitCircle,
			expandCircle,
			emptyCircle,
			exitX,
			expandPlus,
			strokedTab
		} = this.refs;

		let stroked = [
			browserMenuBar,
			browserScrollBar,
			browserInnerWindow,
			exitCircle,
			expandCircle,
			strokedTab,
			emptyCircle
		];

		let unStroked = [expandPlus, exitX, filledTab];

		let browserTl = new TimelineMax();

		for (let el of stroked) {
			browserTl.set(el, {
				transformOrigin: '50% 50%',
				opacity: 0,
				drawSVG: '0%',
				scale: 1
			});
		}

		for (let el of unStroked) {
			browserTl.set(el, {
				transformOrigin: '50% 50%',
				opacity: 0,
				scale: 1.5
			});
		}

		browserTl.staggerTo([
			browserInnerWindow, browserMenuBar, strokedTab, browserScrollBar
		], 1.2, {
			transformOrigin: '50% 50%',
			opacity: 1,
			drawSVG: '100%',
			ease: Power4.easeIn
		}, .5);

		browserTl.staggerTo([
			exitCircle, expandCircle, emptyCircle
		], .5, {
			transformOrigin: '50% 50%',
			opacity: 1,
			ease: Power4.easeIn,
			drawSVG: '100%'
		}, .1);

		browserTl.staggerFromTo([
			exitCircle, expandCircle, emptyCircle
		], 1, {
			scale: 1.6
		}, {
			transformOrigin: '50% 50%',
			scale: 1,
			ease: Bounce.easeOut
		}, .1);

		browserTl.staggerFromTo([
			exitX, expandPlus
		], 3, {
			scale: 2
		}, {
			transformOrigin: '50% 50%',
			opacity: 1,
			drawSVG: '100%',
			scale: 1,
			ease: Bounce.easeOut
		}, .1,);

		browserTl.to(filledTab, .8, {
			opacity: 1,
			scale: 1,
			ease: Bounce.easeOut
		}, '-=4');

		return browserTl.pause();
	}

	handleEnter() {
		setTimeout(() => {
			this.browserAnimation.play();
		}, 300);

	}
	handleLeave() {
		this.browserAnimation.reverse(0);
	}

	render() {

		return (
			<Waypoint onEnter={this.handleEnter.bind(this)} onLeave={this.handleLeave.bind(this)}>
				<div className="row browser">
					<div className="col-sm browser-content">
						<svg id="browser-item-svg" viewBox="0 0 604.8 403.7">
							<path ref='browserMenuBar' d="M602.2.5H2.6A2 2 0 0 0 .6 2V46a2 2 0 0 1 2-1.6h599.6a2 2 0 0 1 2 1.6V2a2 2 0 0 0-2-1.5z" className="a"/>
							<path ref="filledTab" d="M175.3 44c-1.6 0-2.2-1-1.2-2.4l16-22.8a6.6 6.6 0 0 1 5-2.5h55a6.2 6.2 0 0 1 4.7 2.6L269 41.4c1 1.4.3 2.6-1.3 2.6z" className="b"/>
							<path ref="browserInnerWindow" d="M.5 44h603.8v359.2H.5z" className="a"/>
							<path ref="strokedTab" d="M90.2 44.3c-1.7 0-2.2-1-1.3-2.5L105 19a6.6 6.6 0 0 1 4.8-2.5h55a6.2 6.2 0 0 1 4.7 2.6L184 41.8c.8 1.4.2 2.6-1.5 2.6z" className="a"/>
							<rect ref="browserScrollBar" width="7.5" height="328.4" x="592" y="58.4" className="a" rx="2" ry="2"/>
							<circle ref="exitCircle" cx="18.5" cy="24.1" r="6" className="a"/>
							<circle ref="expandCircle" cx="37.6" cy="24.4" r="6" className="a"/>
							<circle ref="emptyCircle" cx="55.6" cy="24.2" r="6" className="a"/>
							<path ref="exitX" transform="translate(-.2, -.5)" d="M20.4 27H20l-1.5-2-1.3 2h-.6l1.7-2.4-1.7-2.4h.5l1.5 2 1.4-2h.4l-1.6 2.4c.8 1 1.6 2.5 1.6 2.5z" className="b"/>
							<path ref="expandPlus" d="M35 24h2.4v-2.4h.5V24h2.4v.6H38v2.6h-.6v-2.6h-2.5z" className="b"/> {this.renderVisualization(this.props.vis)}
						</svg>
					</div>
				</div>
			</Waypoint>
		)
	}

}
