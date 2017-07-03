import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';
import {CSSTransitionGroup} from 'react-transition-group';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="slide-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div key={this.props.location.key} className="col-sm home-content">
					<CenterLogo/>
					<MediaIcons/>
				</div>
			</CSSTransitionGroup>
		)
	}
}
