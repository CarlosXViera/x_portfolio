import React, {PropTypes} from 'react';
import NotifySwipe from 'NotifySwipe';

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.onUnSwipeable();
	}

	componentWillUpdate() {
		console.log('will update');

	}
	componentDidUpdate() {
		console.log('did update');
	}

	componentWillReceiveProps() {
		console.log('will receive');

	}
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div>
				<div id="huge">
					CONTACT PAGE
				</div>
			</div>
		)
	}
}
