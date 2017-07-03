import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';
import {CSSTransitionGroup} from 'react-transition-group';

export default class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hover: false
		}
	}

	handleHover() {
		this.setState({hover: true});
	}

	render() {
		return (
			<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={1000} transitionName="slide-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div key={this.props.location.key} className="col-sm home-content">
					<CenterLogo/>
					<MediaIcons onHover={this.handleHover.bind(this)}/>
				</div>
			</CSSTransitionGroup>
		)
	}
}
