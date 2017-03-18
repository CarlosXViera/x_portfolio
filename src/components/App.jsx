import React from 'react'
import HexContainer from 'HexContainer'
import Hexagons from 'Hexagons'
import Glasses from 'Glasses'
import Scream from 'scream'

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.scream = Scream({
			width: {
				portrait: 1080,
				landscape: 1920
			}
		});

		this.state = {
			orientation: this.scream.getOrientation()
		}

		this.scream.on('orientationchangeend', ()=>{
			let orientation = this.scream.getOrientation();
			console.log(this.scream.getOrientation())
			this.setState({orientation});
		})

	}

	handleOrientation() {
		this.scream.on('orientationchangeend', ()=>{
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
			</div>
		)
	}
}
