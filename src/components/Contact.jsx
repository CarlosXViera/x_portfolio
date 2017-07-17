import React, {PropTypes} from 'react';
import NotifySwipe from 'NotifySwipe';

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<div id="two">
					CONTACT PAGE
				</div>
				<NotifySwipe/>
			</div>
		)
	}
}
