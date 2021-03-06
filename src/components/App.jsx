import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from 'react-router-dom';
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
import vignette from '../assets/vignette-min.png';
import classNames from 'classnames';

const Header = withRouter(({isMobile, location: {
		pathname
	}}) => {
	let headerClass = classNames({
		'header': isMobile,
		'header-mobile': !isMobile || window.innerWidth < 768,
		'about-header': pathname === '/about',
		'home-header': pathname === '/',
		'contact-header': pathname === '/contact',
		'work-header': pathname === '/work'
	})
	return <div className={headerClass}></div>;
});

const Footer = withRouter(({isMobile, location: {
		pathname
	}}) => {
	let footerClass = classNames({
		'footers': isMobile,
		'footer-mobile': !isMobile,
		'about-footer': pathname === '/about',
		'home-footer': pathname === '/',
		'contact-footer': pathname === '/contact',
		'work-footer': pathname === '/work'
	})
	return <div className={footerClass}></div>;
});

export const RoutesTransition = ({children, location: {
		state
	}}) => {

	let transition = state && state.transition;

	return (
		<CSSTransitionGroup className=' row move-contatiner' transitionName={transition || 'bounce'} component='div' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
			{children}
		</CSSTransitionGroup>
	)
}

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.handleResize = this.handleResize.bind(this);
		this.setReRender = this.setReRender.bind(this);
		window.mobileCheck = mobileCheck;

		this.state = {
			orientation: 'landscape',
			hexagonVis: 'default',
			show: false,
			reRender: false,
			initial: false,
			swipeable: false,
			isMobile: !window.mobileCheck()
		}

		this.id = null;
		if (!window.mobileCheck()) {
			window.addEventListener('resize', this.handleResize);
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

	resolutionAdjust(w, h) {
		if (!this.state.isMobile) {
			w = w * .85;
			h = h * .85;
		} else if (w > 1680) {
			w = w * .9;
			h = h * .9;
		} else if (w > 1439 && w < 1680) {
			w = w * .9;
			h = h * .9;
		}

		return {clippedWidth: w, clippedHeight: h}
	}

	render() {
		let {clippedWidth, clippedHeight} = this.resolutionAdjust(window.innerWidth, window.innerHeight);

		console.log
		let header = classNames({
			'header': window.innerWidth > 770,
			'header-mobile': window.innerWidth < 770
		});

		return (
			<div className="root">

				<Router>
					<div className="container app-container">
						<Hexagons ref={r => this.hexagonRefs = r} onRefresh={this.refreshPlay.bind(this)} onCreate={this.createRefresh.bind(this)} onRefreshReverse={this.refreshReverse.bind(this)} reRender={this.state.reRender} width={clippedWidth + 75} height={clippedHeight + 75} initial={this.state.initial} onInit={this.handleInit} viewBox={`0 50 ${clippedWidth} ${clippedHeight}`}/>
						<div className='vignette' style={{
							backgroundImage: `url(${vignette})`
						}}></div>
						<Header isMobile={this.state.isMobile}/>
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
						<Footer isMobile={this.state.isMobile}/>
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
