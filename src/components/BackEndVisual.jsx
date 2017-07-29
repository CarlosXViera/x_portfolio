import React, {PropTypes} from 'react';

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
				<text fill="white" transform="translate(200, 200)">BackEnd Visualisation</text>
			</g>
		)
	}

}
