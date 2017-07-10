import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HexContainer from 'HexContainer';
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

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			orientation: 'landscape',
			hexagonVis: 'default',
			show: false,
			reRender: false
		}

		window.mobileCheck = mobileCheck;
		if (!window.mobileCheck()) {
			this.handleResize = this.handleResize.bind(this);
			window.addEventListener('resize', this.handleResize);
		}

	}

	handleResize() {
		console.log(this)
		function setReRender() {
			this.setState({
				...this.state,
				reRender: !this.state.reRender
			})
		}
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(setReRender.bind(this), 200);
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
		})
	}

	render() {
		return (
			<div className="root">
				<Router>
					<div className="container app-container">
						<TopNav show={this.state.show} handleShow={this.handleShow.bind(this)}/>
						<Route render={(props) => {
							return (
								<Switch >
									<Route path='/work' component={Work}/>
									<Route path='/about' component={AboutMe}/>
									<Route path='/contact' component={Contact}/>
									<Route path='/' component={Home}/>
								</Switch>
							);
						}}/>
					</div>
				</Router>

				<HexContainer key={uuid('fuck')} orientation={this.state.orientation}>

					<Hexagons reRender={this.state.reRender} orientation={this.state.orientation}></Hexagons>

				</HexContainer>
			</div>
		)
	}
}
