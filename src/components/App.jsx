import React from 'react'
import HexContainer from 'HexContainer'
import Hexagons from 'Hexagons'

export default class App extends React.Component {
	state = {orientation: 'portrait'}

	componentDidMount() {}

	render() {
		return (
			<div className="App">
				<HexContainer orientation={this.state.orientation}>
          <Hexagons orientatation={this.state.orientation}>

          </Hexagons>
				</HexContainer>
			</div>
		)
	}
}
