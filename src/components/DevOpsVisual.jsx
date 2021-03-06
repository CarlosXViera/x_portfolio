import React, {PropTypes} from 'react';

export default class DevOpsVisual extends React.Component {
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
			<g className="DevOpsVisual">
				<text fill="white" transform="translate(200, 200)">DevOps Visualisation</text>
			</g>
		)
	}

}
