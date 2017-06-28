import React, {PropTypes} from 'react';
import {RouteTransition} from 'react-router-transition';

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<RouteTransition pathname={this.props.location.pathname} atEnter={{
				translateY: 200
			}} atLeave={{
				translateY: -400
			}} atActive={{
				translateY: 0
			}} mapStyles={styles => ({transform: `translateY(${styles.translateY}%)`})}>
				<div id="two">
					CONTACT PAGE
				</div>
			</RouteTransition>
		)
	}
}
