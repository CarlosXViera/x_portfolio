import React, {PropTypes} from 'react';
import CenterLogo from 'CenterLogo';
import MediaIcons from 'MediaIcons';
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
			<div key={this.props.location.key} className="col-sm home-content">
				<CenterLogo className=""/>
				<div className="row social-media-icons">
					<div className="col-sm-6 col-sm-offset-3 social-media-icons-content">
						<MediaIcons translate={'translate(0,0)'} onHover={this.handleHover.bind(this)}/>
					</div>
				</div>
				<NotifySwipe {...this.props}/>
			</div>
		)
	}
}
