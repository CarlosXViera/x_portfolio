import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="col-sm home-content">
				<CenterLogo/>
				<MediaIcons/>
			</div>
		)
	}
}
