import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Hexagons from 'Hexagons';
import TopNav from 'TopNav';
import AboutMe from 'AboutMe';
import Work from 'Work';
import Contact from 'Contact';
import Home from 'Home';
import WorkControls from 'WorkControls';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'uuid';
import {Transition} from 'Transitions';
import {mobileCheck} from 'utils';
import Swipeable from 'react-swipeable';
import {handleSwipeUp, handleSwipeDown} from 'utils';
import {TweenMax, TimelineMax, Bounce, Sine} from 'gsap/src/minified/TweenMax.min';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			orientation: 'landscape',
			hexagonVis: 'default',
			show: false,
			reRender: false,
			initial: false,
			swipeable: false
		}
		this.isMobile = false;

		window.mobileCheck = mobileCheck;
		if (!window.mobileCheck()) {
			this.handleResize = this.handleResize.bind(this);
			window.addEventListener('resize', this.handleResize);
		} else {
			this.isMobile = true;
		}
		this.handleInit = this.handleInit.bind(this);
		this.getRefreshAnimation = this.getRefreshAnimation.bind(this);

	}
	componentDidMount() {}

	createRefresh(type, cb) {
		this.refresh = this.getRefreshAnimation();
		this.refresh.eventCallback(type, cb);
	}

	componentWillReceiveProps(nextProps, nextState) {}

	refreshPlay() {
		this.refresh.play();
	}

	refreshReverse() {
		this.refresh.reverse(0);
	}

	shouldComponentUpdate(nextProps, nextState) {

		if (this.state.reRender !== nextState.reRender) {
			return true;
		}

		if (this.state.hexagonVis !== nextState.hexagonVis) {
			return false;
		}

		if (this.state.initial !== nextState.initial) {
			return false;
		}

		if (this.state.swipeable || !this.state.swipeable || nextState.swipeable || !nextState.swipeable) {
			return false;
		}

	}

	handleResize() {
		function setReRender() {

			this.refresh.play();
			setTimeout(() => {
				this.setState({
					...this.state,
					reRender: !this.state.reRender
				});
			}, 1500)

		}
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(setReRender.bind(this), 300);
	}

	handleSwipeable() {
		this.setState({
			...this.state,
			swipeable: true
		});
	}
	handleUnSwipeable() {
		this.setState({
			...this.state,
			swipeable: false
		});
	}

	componentDidUpdate() {}

	renderHomePage(props) {
		return (
			<Swipeable trackMouse={true} delta={300} onSwipedDown={() => handleSwipeDown(props, this.state.swipeable)} onSwipedUp={() => handleSwipeUp(props, this.state.swipeable)}>
				<Home onSwipeable={this.handleSwipeable.bind(this)} onUnSwipeable={this.handleUnSwipeable.bind(this)} {...props}/>
			</Swipeable>
		)

	}
	renderMainPages(props) {
		let pages = {
			work: Work,
			about: AboutMe,
			contact: Contact
		};
		const CurrentPage = pages[props.match.params.page];

		return (
			<Swipeable trackMouse={true} delta={300} onSwipedDown={() => handleSwipeDown(props, this.state.swipeable)} onSwipedUp={() => handleSwipeUp(props, this.state.swipeable)}>
				<CurrentPage onSwipeable={this.handleSwipeable.bind(this)} onUnSwipeable={this.handleUnSwipeable.bind(this)} {...props}/>
			</Swipeable>
		)
	}

	getRefreshAnimation() {

		let refreshTl = new TimelineMax();

		refreshTl.fromTo(this.refreshPane, .6, {
			visibility: 'hidden',
			width: '0%',
			ease: Power4.easeOut
		}, {

			visibility: 'visible',
			width: '100%',
			ease: Power4.easeIn,
			zIndex: 1000
		});

		return refreshTl.pause(0);
	}

	handleInit() {
		this.setState({
			...this.state,
			initial: !this.state.initial
		});
	}

	clip(number, min, max) {
		return Math.max(min, Math.min(number, max));
	}

	render() {
		let clippedWidth = window.innerWidth;
		let clippedHeight = window.innerHeight;
		if (this.isMobile) {
			clippedWidth = clippedWidth * .9;
			clippedHeight = clippedHeight * .9;
		} else if (clippedWidth > 1680) {
			clippedWidth = clippedWidth * .9;
			clippedHeight = clippedHeight * .9;
		} else if (clippedWidth > 1439 && clippedWidth < 1680) {
			clippedWidth = clippedWidth * .8;
			clippedHeight = clippedHeight * .8;
		}

		return (
			<div className="root">
				<Router>
					<div ref='scene' className="container app-container">
						<TopNav/>
						<Route render={({location, history, match}) => {
							return (
								<Switch >
									<Route path={`${match.url}:page`} component={this.renderMainPages.bind(this)}/>
									<Route path='/' component={this.renderHomePage.bind(this)}/>
								</Switch>
							);
						}}/>
						<Hexagons ref={r => this.hexagonRefs = r} onRefresh={this.refreshPlay.bind(this)} onCreate={this.createRefresh.bind(this)} onRefreshReverse={this.refreshReverse.bind(this)} reRender={this.state.reRender} width={clippedWidth + 50} height={clippedHeight - 80} initial={this.state.initial} onInit={this.handleInit} viewBox={`0 0 ${clippedWidth} ${clippedHeight}`}/>
						<div className='vignette'></div>

					</div>
				</Router>
				<div className='refresh-pane' ref={(r) => {
					if (r === null)
						return;
					this.refreshPane = r
				}}></div>
			</div>
		)
	}
}
