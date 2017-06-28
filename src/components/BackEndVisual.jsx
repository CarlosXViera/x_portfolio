import React, {PropTypes} from 'react';
import {select, selection} from 'd3-selection';
import 'd3-transition';

export default class BackEndVisual extends React.Component {
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
		}, () => console.log('FrontEndVisual Rendered!'))
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		return (
			<g className="BackEndVisual">
				<rect height="20" width="20" fill="blue"></rect>
			</g>
		)
	}

}
