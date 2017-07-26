import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';
import {CSSTransitionGroup} from 'react-transition-group';
import {Transition} from 'Transitions';
import NotifySwipe from 'NotifySwipe';

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
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		this.props.onUnSwipeable();
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Transition settings={{
				time: 300,
				transition: 'slide-up'
			}}>
				<div key={this.props.location.key} className="col-sm home-content click-through-child">
					<CenterLogo className="click-through click-through-child"/>
					<MediaIcons onHover={this.handleHover.bind(this)}/>
				</div>
			</Transition>
		)
	}
}
