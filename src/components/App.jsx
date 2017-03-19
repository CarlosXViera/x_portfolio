import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import HexContainer from 'HexContainer'
import Hexagons from 'Hexagons'
import Glasses from 'Glasses'
import Scream from 'scream'
import Topbar from 'Topbar'
import {Main} from 'Main'
import Works from 'Works'
import Contact from 'Contact'
import About from 'About'

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.scream = Scream({
			width: {
				portrait: window.screen.width,
				landscape: window.screen.width
			}
		});

		this.state = {
			orientation: this.scream.getOrientation()
		}

		this.scream.on('orientationchangeend', () => {
			let orientation = this.scream.getOrientation();
			console.log(this.scream.getOrientation())
			this.setState({orientation});
		})

	}

	handleOrientation() {
		this.scream.on('orientationchangeend', () => {
			let orientation = this.scream.getOrientation();
			this.setState({orientation});
		})
	}

	componentWillMount() {

	}

	render() {
		return (
			<div className="App">
				<HexContainer onLayout={this.handleLayout} orientation={this.state.orientation}>
					<Hexagons orientation={this.state.orientation}></Hexagons>
					<Glasses orientation={this.state.orientation}/>
				</HexContainer>
				<Topbar className="app_top_bar"/>
				<Router>
						<Switch>
							<Route exact path='/' component={Main}/>
							<Route path='/about' component={About}/>
							<Route path='/works' component={Works}/>
							<Route path='/contacts' component={Contact}/>
						</Switch>
				</Router>
			</div>
		)
	}
}
