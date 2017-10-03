import React, {PropTypes} from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import WorkContent from 'WorkContent';
import NotifySwipe from 'NotifySwipe';
import DrawSVGPlugin from 'DrawSVGPlugin';
import {TimelineMax, Power4, Bounce, Sine, Circ} from 'gsap/src/minified/TweenMax.min';
import {shuffle} from 'utils';
import {SVG, WorkItems} from 'WorkSVG';

export default class WorkList extends React.Component {
	constructor(props) {
		super(props);

		this.contentTransition = {
			transition: 'slide-up'
		}

		this.getMPMouseOver = this.getMPMouseOver.bind(this);
		this.getDSMouseOver = this.getDSMouseOver.bind(this);
		this.getPGMouseOver = this.getPGMouseOver.bind(this);
		this.getHCMouseOver = this.getHCMouseOver.bind(this);
		this.getGSMouseOver = this.getGSMouseOver.bind(this);
		this.nextOrPrev = this.nextOrPrev.bind(this);

		this.state = {
			disable: false
		}

		this.mouseProps = {
			mpProps: {
				onMouseEnter: this.onMPMouseEnter.bind(this),
				onMouseLeave: this.onMPMouseLeave.bind(this),
				onTouchEnd: this.onMPMouseTouch.bind(this),
				onClick: this.onMPMouseClick.bind(this)
			},
			dsProps: {
				onMouseEnter: this.onDSMouseEnter.bind(this),
				onMouseLeave: this.onDSMouseLeave.bind(this),
				onTouchEnd: this.onDSMouseTouch.bind(this),
				onClick: this.onDSMouseClick.bind(this)
			},
			pgProps: {
				onMouseEnter: this.onPGMouseEnter.bind(this),
				onMouseLeave: this.onPGMouseLeave.bind(this),
				onTouchEnd: this.onPGMouseTouch.bind(this),
				onClick: this.onPGMouseClick.bind(this)
			},
			hcProps: {
				onMouseEnter: this.onHCMouseEnter.bind(this),
				onMouseLeave: this.onHCMouseLeave.bind(this),
				onTouchEnd: this.onHCMouseTouch.bind(this),
				onClick: this.onHCMouseClick.bind(this)
			},
			gsProps: {
				onMouseEnter: this.onGSMouseEnter.bind(this),
				onMouseLeave: this.onGSMouseLeave.bind(this),
				onTouchEnd: this.onGSMouseTouch.bind(this),
				onClick: this.onGSMouseClick.bind(this)
			}
		}
	}

	setDisable() {
		this.setState({disable: true})
	}

	componentDidMount() {
		this.props.onUnSwipeable();
		setTimeout(() => this.initializeTweens(), 300);


	}

	initializeTweens() {
		if (document.getElementById('work-item-svg')) {
			this.mpMouseOver = this.getMPMouseOver();
			this.dsMouseOver = this.getDSMouseOver();
			this.pgMouseOver = this.getPGMouseOver();
			this.hcMouseOver = this.getHCMouseOver();
			this.gsMouseOver = this.getGSMouseOver();
		}

	}

	componentWillUnmount() {}

	removeAnimations(tl) {
		tl.pause(0);
		tl.invalidate();

	}

	nextOrPrev(dir) {
		this.direction = dir;
	}

	getGSMouseOver() {
		let blink = document.getElementById('blink-path');
		let eye = document.getElementById('eye');

		console.log(eye);
		let eyeTl = new TimelineMax();

		eyeTl.to(eye, .35, {
			transformOrigin: '50% 50%',
			x: 250,
			scale: .95,
			ease: Circ.easeOut
		})
		eyeTl.to(eye, .35, {
			transformOrigin: '50% 50%',
			x: 125,
			y: 300,
			scale: .9,
			ease: Circ.easeOut
		})

		eyeTl.to(eye, .35, {
			transformOrigin: '50% 50%',
			x: 250,
			y: 280,
			scale: .8,
			ease: Circ.easeOut
		})
		eyeTl.to(eye, .35, {
			transformOrigin: '50% 50%',
			x: 190,
			y: 290,
			scale: 1,
			ease: Circ.easeOut
		})

		eyeTl.to(eye, .3, {
			transformOrigin: '50% 50%',
			scaleY: .85,
			ease: Circ.easeOut,
			yoyo: true,
			repeat: 3
		}).addLabel('eye');

		eyeTl.to(blink, .3, {
			transformOrigin: '50% 50%',
			scaleY: 0,
			ease: Circ.easeOut,
			yoyo: true,
			repeat: 3
		}, '-=1.25');

		return eyeTl.addLabel('eye-mouseOver').pause(0);

	}

	getHCMouseOver() {
		let hcme = document.getElementById('hcme-path');
		let hcmeTl = new TimelineMax({repeat: 3, yoyo: true});

		hcmeTl.to(hcme, 1, {
			y: -10,
			opacity: 1,
			ease: Sine.easeInOut
		});

		return hcmeTl.addLabel('hcme-mouseOver').pause(0);
	}

	getDSMouseOver() {
		let stars = document.getElementsByClassName('star');
		let starsTl = new TimelineMax({repeat: 1, yoyo: true});

		starsTl.staggerTo(stars, 1, {
			transformOrigin: '50% 50%',
			scale: -1.5,
			ease: Power4.easeInOut
		}, .1);

		return starsTl.addLabel('star-mouseOver').pause(0);
	}

	getPGMouseOver() {
		let circles = document.getElementsByClassName('node');
		let lines = document.getElementsByClassName('link');
		let nodeTl = new TimelineMax();
		let pairs = {
			pair1: [
				circles[0], circles[9], lines[0]
			],
			pair2: [
				circles[1], circles[2], lines[2]
			],
			pair3: [
				circles[3], circles[8], lines[7]
			],
			pair4: [
				circles[4], circles[6], lines[5]
			],
			pair5: [
				circles[5], circles[2], lines[3]
			],
			pair6: [
				circles[4], circles[1], lines[6]
			],
			pair7: [
				circles[7], circles[2], lines[1]
			],
			pair8: [
				circles[2], circles[6], lines[4]
			],
			pair9: [
				circles[2], circles[8], lines[9]
			],
			pair10: [
				circles[9], circles[8], lines[8]
			],
			pair11: [circles[2], circles[3], lines[10]]
		}

		let create = (c1, c2, l) => {
			nodeTl.to(l, .1, {drawSVG: '100%'});
		}
		nodeTl.set(lines, {drawSVG: '0%'});

		nodeTl.staggerFromTo(circles, .3, {
			transformOrgin: '50% 50%',
			opacity: 0,
			scale: 3
		}, {
			opacity: 1,
			scale: 1,
			ease: Power4.easeOut
		}, .1);

		for (let pair in pairs) {
			create(...pairs[pair]);
		}

		return nodeTl.timeScale(1.5).pause(11);

	}

	getMPMouseOver() {
		let playhead = document.getElementById('play-head'),
			musicPlayer = document.getElementById('music-player'),
			playButton = document.getElementById('play-button'),
			pauseButton = document.getElementById('pause-button'),
			circleInner = document.getElementById('music-player-inner'),
			playerTl = new TimelineMax();

		playerTl.set(playhead, {
			transformOrigin: '50% 50%',
			strokeWidth: 12,
			drawSVG: '0%',
			stroke: '#7FDA89',
			rotation: 270,
			ease: Power4.easeOut
		})
		playerTl.set(pauseButton, {
			transformOrigin: '50% 50%',
			scale: 0
		})
		playerTl.fromTo(musicPlayer, 2, {
			transformOrigin: '50% 50%',
			opacity: 0,
			scale: 3
		}, {
			scale: 1,
			opacity: 1,
			ease: Bounce.easeOut
		})
		playerTl.to(playButton, .3, {
			transformOrigin: '50% 50%',

			scale: 0,
			ease: Power4.easeIn
		})
		playerTl.to(pauseButton, .5, {
			transformOrigin: '50% 50%',
			scale: 1,
			ease: Bounce.easeOut
		})

		playerTl.to(playhead, 4, {drawSVG: '100%'})

		return playerTl.pause(2).timeScale(1.5);

	}

	onGSMouseTouch(e) {
		e.stopPropagation();
		this.setDisable()
		e.preventDefault();
		this.gsMouseOver.timeScale(3).play(0).call(() => this.props.history.push('/work/gravesendseye', this.contentTransition));
	}

	onGSMouseClick(e) {
		e.stopPropagation();
		this.setDisable()
		e.preventDefault();
		this.props.history.push('/work/gravesendseye', this.contentTransition);
	}

	onGSMouseEnter(e) {
		e.preventDefault();
		this.gsMouseOver.play(0);
	}

	onGSMouseLeave(e) {
		e.preventDefault()
		this.gsMouseOver.reverse()
	}

	onHCMouseTouch(e) {
		e.stopPropagation();
		e.preventDefault();
		this.setDisable();
		this.hcMouseOver.timeScale(3).play(0).call(() => this.props.history.push('/work/hmce', this.contentTransition));
	}

	onHCMouseClick(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setDisable();
		this.props.history.push('/work/hmce', this.contentTransition);
	}

	onHCMouseEnter() {
		this.hcMouseOver.play(0);
	}

	onHCMouseLeave() {
		this.hcMouseOver.reverse()
	}

	onDSMouseTouch(e) {
		this.setDisable();
		e.stopPropagation();
		this.dsMouseOver.timeScale(3).play(0).call(() => this.props.history.push('/work/deepspace', this.contentTransition));
	}

	onDSMouseClick(e) {
		e.stopPropagation();
		this.setDisable();
		e.preventDefault();

		this.props.history.push('/work/deepspace', this.contentTransition);
	}

	onDSMouseEnter() {
		this.dsMouseOver.play(0);
	}

	onDSMouseLeave() {
		this.dsMouseOver.reverse()
	}

	onPGMouseTouch(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setDisable();
		this.pgMouseOver.timeScale(3).play(0).call(() => this.props.history.push('/work/pressinggame', this.contentTransition));
	}

	onPGMouseClick(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setDisable();
		this.props.history.push('/work/pressinggame', this.contentTransition);
	}

	onPGMouseEnter() {
		this.pgMouseOver.play(0);
	}

	onPGMouseLeave() {
		this.pgMouseOver.reverse(4).eventCallback('onReverseComplete', () => this.pgMouseOver.pause(4));
	}

	onMPMouseTouch(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setDisable();
		this.mpMouseOver.timeScale(3).play(0).call(() => this.props.history.push('/work/musicplayer', this.contentTransition));
	}

	onMPMouseClick(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setDisable();
		this.props.history.push('/work/musicplayer', this.contentTransition);
	}

	onMPMouseEnter() {
		this.mpMouseOver.play(0);
	}

	onMPMouseLeave() {
		this.mpMouseOver.reverse(8).eventCallback('onUpdate', (e) => {
			if (this.mpMouseOver.time() <= 2 && this.mpMouseOver.reversed()) {
				this.mpMouseOver.pause();
			}
		})
	}

	render() {
		return (
			<div id='work-page' className='row work-page'>
				<WorkItems disabledStatus={this.state.disable} {...this.mouseProps}/>
				<NotifySwipe {...this.props}/>
			</div>
		);
	}
}

WorkList.propTypes = {};
