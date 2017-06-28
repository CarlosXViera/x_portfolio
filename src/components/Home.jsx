import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';
import {RouteTransition} from 'react-router-transition';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillUnmount() {
		console.log('unmounting');
	}

	render() {
		return (
			<RouteTransition pathname={this.props.location.pathname} atEnter={{
				translateY: 800
			}} atLeave={{
				translateX: 800
			}} atActive={{
				translateY: 40
			}} mapStyles={styles => ({transform: `translateY(${styles.translateY}%)`})}>
				<div id="" className="grid-row">
					<div className="grid-xs-col-6 offset-xs-col-3 grid-md-col-4 offset-md-col-4 home-content">
						<CenterLogo/>
					</div>
					<div className="grid-xs-col-6 offset-xs-col-3 grid-md-col-4 offset-md-col-4 icon-content">
						<MediaIcons/>
					</div>
				</div>
			</RouteTransition>
		)
	}
}
