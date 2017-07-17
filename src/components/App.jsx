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

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			orientation: 'landscape',
			hexagonVis: 'default',
			show: false,
			reRender: false,
			initial: false
		}

		window.mobileCheck = mobileCheck;
		if (!window.mobileCheck()) {
			this.handleResize = this.handleResize.bind(this);
			window.addEventListener('resize', this.handleResize);
		}

		this.handleInit = this.handleInit.bind(this);

	}
	componentDidMount() {}

	componentWillReceiveProps(nextProps, nextState) {}

	handleResize() {
		function setReRender() {
			this.setState({
				...this.state,
				reRender: !this.state.reRender
			})
		}
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(setReRender.bind(this), 1000);
	}

	handleClick() {
		this.setState({
			...this.state,
			show: false
		})
	}

	handleShow() {
		this.setState({
			...this.state,
			show: !this.state.show
		});
	}

	componentDidUpdate() {}

	renderHomePage(props) {
		return (
			<Swipeable delta={300} onSwipedDown={() => handleSwipeDown(props)} onSwipedUp={() => handleSwipeUp(props)}>
				<Home {...props}/>
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
			<Swipeable delta={300} onSwipedDown={() => handleSwipeDown(props)} onSwipedUp={() => handleSwipeUp(props)}>
				<CurrentPage {...props}/>
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
						<TopNav show={this.state.show} handleShow={this.handleShow.bind(this)}/>
						<Route render={({location, history, match}) => {
							return (
								<Switch >
									<Route path={`${match.url}:page`} component={this.renderMainPages}/>
									<Route path='/' component={this.renderHomePage}/>
								</Switch>
							);
						}}/>
						<Hexagons reRender={this.state.reRender} width={window.innerWidth + 55} height={window.innerHeight + 55} initial={this.state.initial} onInit={this.handleInit} viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}/>
					</div>
				</Router>
			</div>
		)
	}
}
