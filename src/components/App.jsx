import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Hexagons from 'Hexagons';
import TopNav from 'TopNav';
import AboutMe from 'AboutMe';
import Work from 'Work';
import Contact from 'Contact';
import Home from 'Home';
import WorkControls from 'WorkControls';
import uuid from 'uuid';
import {mobileCheck} from 'utils';
import Swipeable from 'react-swipeable';
import {handleSwipeUp, handleSwipeDown, handleSwipeRight, handleSwipeLeft} from 'utils';
import {TweenMax, TimelineMax, Bounce, Sine} from 'gsap/src/minified/TweenMax.min';
import {CSSTransitionGroup} from 'react-transition-group';

export const RoutesTransition = ({children, location: {
		state
	}}) => {

	let transition = state && state.transition;

	return (
		<CSSTransitionGroup className=' row move-contatiner' transitionName={transition || 'bouce'} component='div' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
			{children}
		</CSSTransitionGroup>
	)
}

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
		this.handleResize = this.handleResize.bind(this);
		this.setReRender = this.setReRender.bind(this);
		window.mobileCheck = mobileCheck;

		this.id = null;
		if (!window.mobileCheck()) {
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

	setReRender() {
		this.refresh.play();
		setTimeout(() => {
			this.setState({
				...this.state,
				reRender: !this.state.reRender
			});
		}, 1000);
	}

	handleResize() {
		clearTimeout(this.id);
		this.id = setTimeout(() => this.setReRender(), 500);
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
			<Swipeable className='app-total' stopPropagation={true} trackMouse={true} delta={100} onSwipedRight={() => handleSwipeRight(props)} onSwipedLeft={() => handleSwipeLeft(props)}>
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

			<Swipeable className='app-total col-sm' stopPropagation={true} trackMouse={true} delta={100} onSwipedRight={() => handleSwipeRight(props)} onSwipedLeft={() => handleSwipeLeft(props)}>
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
				<div className='header hidden-sm'></div>
				<Router>
					<div className="container app-container">
						<Hexagons ref={r => this.hexagonRefs = r} onRefresh={this.refreshPlay.bind(this)} onCreate={this.createRefresh.bind(this)} onRefreshReverse={this.refreshReverse.bind(this)} reRender={this.state.reRender} width={clippedWidth + 50} height={clippedHeight + 50} initial={this.state.initial} onInit={this.handleInit} viewBox={`0 0 ${clippedWidth} ${clippedHeight}`}/>
						<div className='vignette'></div>
						<TopNav/>

						<Route render={({location, history, match}) => {
							return (
								<RoutesTransition location={location}>
									<Switch key={location.key} location={location}>
										<Route path={`${match.url}:page`} component={this.renderMainPages.bind(this)}/>
										<Route path='/' component={this.renderHomePage.bind(this)}/>
									</Switch>
								</RoutesTransition>
							);
						}}/>

					</div>
				</Router>
				<div className='refresh-pane' ref={(r) => {
					if (r === null)
						return;
					this.refreshPane = r
				}}></div>
				<div className='footer'></div>
			</div>
		)
	}
}
