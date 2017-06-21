import React, { PropTypes } from 'react';
import CenterLogo from 'CenterLogo';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div id="" className="grid-row">
        <div id="" className="grid-xs-col-6 offset-xs-col-3 grid-md-col-4 offset-md-col-4 home-content">
          <CenterLogo/>
        </div>
			</div>
		)
	}
}
