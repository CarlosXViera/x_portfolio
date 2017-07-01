import React, {PropTypes} from 'react';
import {select, selection} from 'd3-selection';
import DefineGlasses from 'Glasses';

export default class CenterLogo extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			g: null
		}

	}

	shouldComponentUpdate() {
		return false;
	}

	onRef = (ref) => {
		this.setState({
			g: select(ref)
		}, () => console.log('rendering!'))
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		return (
			<div className="row center-logo">
				<div className="col-sm-6 col-sm-offset-3 center-logo-content">
					<svg id="center-logo-svg" viewBox="0 0 292.2 333.9" ref={this.onRef}>
						<g id="logo-outline">
							<DefineGlasses position={'Front'} transformation={'translate(50, 120)'}/>
							<path d="M226.8 51.3l57.4 33a5.8 5.8 0 0 1 2.5 4.4V173l5.5-3.6V88.6a11.2 11.2 0 0 0-5.2-9l-56.2-32.3zM5.5 172.5V88.7A5.8 5.8 0 0 1 8 84.4l55.3-32-5-3.5-53 30.6a11.2 11.2 0 0 0-5.3 9v87.8z" className="colored-outline"/>
							<path d="M82 41.6L143.7 6a5.8 5.8 0 0 1 5 0l60.3 35 4-4-61.7-35.7a11.2 11.2 0 0 0-10.4 0L77 38zM286.6 196.5v48.8a5.8 5.8 0 0 1-2.4 4.2l-55.8 32.3 1.2 5.7 57.4-33.2a11.2 11.2 0 0 0 5.2-9V193z" className="white-outlines"/>
							<path d="M210.2 292.3l-61.6 35.5a5.8 5.8 0 0 1-5 0l-65.3-37.6 1.5 7.2 61 35.3a11.2 11.2 0 0 0 10.5 0l60-34.7z" className="colored-outline"/>
							<path d="M55.2 276.8L8 249.5a5.8 5.8 0 0 1-2.5-4.2V197L0 201v44.3a11.2 11.2 0 0 0 5.2 9L56.7 284z" className="white-outlines"/>
							<text className="logo-text" transform="translate(31.89 237.25)">
								&lt;/<tspan x="51" y="0" className="logo-name">viera.io</tspan>
								<tspan x="206.6" y="0" className="e">&gt;</tspan>
							</text>
						</g>
					</svg>
				</div>
			</div>
		)
	}

}
