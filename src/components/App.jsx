import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import HexContainer from 'HexContainer'
import Hexagons from 'Hexagons'
import TopNav from 'TopNav'
// import Scream from 'scream'

export default class App extends React.Component {

	constructor(props) {
		super(props);

		// this.scream = Scream({
		// 	width: {
		// 		portrait: window.innerWidth,
		// 		landscape: window.innerWidth
		// 	}
		// });

		this.state = {
			orientation: 'landscape'
		}

		// this.scream.on('orientationchangeend', () => {
		// 	let orientation = this.scream.getOrientation();
		// 	this.setState({orientation});
		// })
		// // window.addEventListener('resize', () => {
		// // 	this.setState({...this.state});
		// // 	console.log(this.state);
		// // })

	}
	//added this just to check push priviledges.
	// handleOrientation() {
	// 	this.scream.on('orientationchangeend', () => {
	// 		let orientation = this.scream.getOrientation();
	// 		this.setState({orientation});
	// 	})
	// 	console.log('darya');
	// }

	componentWillMount() {}

	render() {
		return (
			<div className="App">
				<div className="container mid">
					<TopNav/>
				</div>
				<HexContainer onLayout={this.handleLayout} orientation={this.state.orientation}>
					<Hexagons orientation={this.state.orientation}></Hexagons>
				</HexContainer>
			</div>
		)
	}
}
