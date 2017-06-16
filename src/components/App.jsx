import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import HexContainer from 'HexContainer'
import Hexagons from 'Hexagons'
import Scream from 'scream'

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.scream = Scream({
			width: {
				portrait: window.innerWidth,
				landscape: window.innerWidth
			}
		});

		this.state = {
			orientation: this.scream.getOrientation()
		}

		this.scream.on('orientationchangeend', () => {
			let orientation = this.scream.getOrientation();
			this.setState({orientation});
			window.location.reload();
		})

	}
//added this just to check push priviledges.
	handleOrientation() {
		this.scream.on('orientationchangeend', () => {
			let orientation = this.scream.getOrientation();
			this.setState({orientation});
		})
		console.log(orientation);
	}

	componentWillMount() {

	}

	render() {
		return (
			<div className="App">
				<HexContainer onLayout={this.handleLayout} orientation={this.state.orientation}>
					<Hexagons orientation={this.state.orientation}></Hexagons>
				</HexContainer>
			</div>
		)
	}
}
