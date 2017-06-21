import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div id="" className="grid-row">
				<div className="grid-xs-col-6 offset-xs-col-3 grid-md-col-4 offset-md-col-4 home-content">
					<CenterLogo/>
				</div>
				<div className="grid-xs-col-6 offset-xs-col-3 grid-md-col-4 offset-md-col-4 icon-content">
					<MediaIcons/>
				</div>
			</div>
		)
	}
}
