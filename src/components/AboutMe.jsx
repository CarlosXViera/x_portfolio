import React, {PropTypes} from 'react';
import Browser from 'Browser';
import SkillButtons from 'SkillButtons';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

const LeftContent = () => {
	return (
		<div className="grid-xs-col-12 grid-xl-col-6 left-content">
			<div className="grid-row">
				<div className="grid-xs-col-3 grid-md-col-2 empty-border-button">
					<h5>
						&#60;about&#62;
					</h5>
				</div>
			</div>
			<div className="grid-row">
				<div className="grid-xs-col-10 offset-xs-col-1 text-content">
					<p>
						I’m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor’s of technology and currently an adjunct lecturer at New York City College of Technology. I’m a natural problem solver; I enjoy finding efficient solutions to complex problems. I’m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</div>
			<div className="grid-row">
				<div className="grid-xs-col-3 offset-xs-col-9 grid-md-col-2 offset-md-10 empty-border-button">
					<h5>
						&#60;/about&#62;
					</h5>
				</div>
			</div>
		</div>
	)
};

export default class AboutMe extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visualization: 'default'
		}
	}

	onClick(type) {
		this.setState({visualization: type});

	}

	componentDidMount() {}

	renderRightContent() {
		return (
			<div className="grid-xs-col-12 grid-xl-col-6 right-content">
				<div className="grid-row--center">
					<div className="grid-xs-col-10 offset-xs-col1 browser">
						<Browser vis={this.state.visualization}/>
					</div>
				</div>
				<div className="grid-row">
					<div className="grid-xs-col-6 offset-xs-col-3 skill-buttons">
						<SkillButtons handleClick={this.onClick.bind(this)}/>
					</div>
				</div>
				<div className="grid-row skill-divs">
					<div className="grid-row skill-container">
						<div className="grid-xs-col-4 empty-border-button" onClick={() => this.onClick('front-end')}>
							<h5>
								Frontend
							</h5>
						</div>
						<div className="grid-xs-col-4 empty-border-button" onClick={() => this.onClick('back-end')}>
							<h5>
								Backend
							</h5>
						</div>
						<div className="grid-xs-col-4 empty-border-button" onClick={() => this.onClick('dev-ops')}>
							<h5>
								DevOps
							</h5>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderLeftContent() {}

	render() {
		return (
			<div className="grid-row total-content">
				<div className="grid-xs-col-4 offset-xs-col-4 page-title">
					<h1>Hello,</h1>
					<p className="title-divider">■ ■ ■ ■</p>
				</div>
				{LeftContent()}
				{this.renderRightContent()}
			</div>
		)
	}
}
