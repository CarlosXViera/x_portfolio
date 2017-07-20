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
				<div id="">
					I’m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor’s of technology and currently an adjunct lecturer at New York City College of Technology. I’m a natural problem solver; I enjoy finding efficient solutions to complex problems. I’m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. I’m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor’s of technology and currently an adjunct lecturer at New York City College of Technology. I’m a natural problem solver; I enjoy finding efficient solutions to complex problems. I’m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
				</div>
			</div>
		)
	}
}
