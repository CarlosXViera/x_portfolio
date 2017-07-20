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
import uuid from 'node-uuid';
import {Transition} from 'Transitions';
import {mobileCheck} from 'utils';
import Swipeable from 'react-swipeable';
import {handleSwipeUp, handleSwipeDown} from 'utils';
import {TweenMax, TimeLineMax, Sine, Bounce} from 'gsap';

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

		window.mobileCheck = mobileCheck;
		if (!window.mobileCheck()) {
			this.handleResize = this.handleResize.bind(this);
			window.addEventListener('resize', this.handleResize);
		}

		this.handleInit = this.handleInit.bind(this);

	}
	componentDidMount() {}

	componentWillReceiveProps(nextProps, nextState) {
		console.log('receiving at app')
	}

	shouldComponentUpdate(nextProps, nextState) {

		if (this.state.reRender !== nextState.reRender) {
			return true;
		}

		if (this.state.hexagonVis !== nextState.hexagonVis) {
			return true;
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

			this.setState({
				...this.state,
				reRender: !this.state.reRender
			});

		}
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(setReRender.bind(this), 150);
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
			<Swipeable trackMouse={true} delta={200} onSwipedDown={() => handleSwipeDown(props, this.state.swipeable)} onSwipedUp={() => handleSwipeUp(props, this.state.swipeable)}>
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
			<Swipeable trackMouse={true} delta={200} onSwipedDown={() => handleSwipeDown(props, this.state.swipeable)} onSwipedUp={() => handleSwipeUp(props, this.state.swipeable)}>
				<CurrentPage onSwipeable={this.handleSwipeable.bind(this)} onUnSwipeable={this.handleUnSwipeable.bind(this)} {...props}/>
			</Swipeable>
		)

	}

	handleInit() {
		this.setState({
			...this.state,
			initial: !this.state.initial
		});
	}

	render() {

		return (
			<div className="root">
				<Router>
					<div className="container app-container click-through-child">
						<TopNav/>
						<Route render={({location, history, match}) => {
							return (
								<Switch >
									<Route path={`${match.url}:page`} component={this.renderMainPages.bind(this)}/>
									<Route path='/' component={this.renderHomePage.bind(this)}/>
								</Switch>
							);
						}}/>
						<Hexagons ref='hexagons' reRender={this.state.reRender} width={window.innerWidth + 35} height={window.innerHeight + 35} initial={this.state.initial} onInit={this.handleInit} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}/>
					</div>
				</Router>
			</div>
		)
	}
}
