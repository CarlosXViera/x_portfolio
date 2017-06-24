import React, {PropTypes} from 'react';

export default class WorkContent extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div id="two" className="grid-row--center">
				<div className="media-carousel">
					{this.props.titleId};
				</div>

			</div>
		)
	}
}
