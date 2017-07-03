import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HexContainer from 'HexContainer'
import Hexagons from 'Hexagons'
import TopNav from 'TopNav'
import AboutMe from 'AboutMe';
import Work from 'Work';
import Contact from 'Contact';
import Home from 'Home';
import WorkControls from 'WorkControls';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			orientation: 'landscape'
		}

	}

	render() {
		return (
			<div className="root">
				<Router>
					<div className="container app-container">
						<TopNav/>
						<Route render={(props) => {
							return (
								<Switch>
									<Route path='/work' component={Work}/>
									<Route path='/about' component={AboutMe}/>
									<Route path='/contact' component={Contact}/>
									<Route path='/' component={Home}/>
								</Switch>
							);
						}}/>
					</div>
				</Router>
				<HexContainer onLayout={this.handleLayout} orientation={this.state.orientation}>
					<Hexagons orientation={this.state.orientation}></Hexagons>
				</HexContainer>
			</div>
		)
	}
}
