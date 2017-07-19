import React, {PropTypes} from 'react';
import Browser from 'Browser';
import SkillButtons from 'SkillButtons';
import {RouteTransition} from 'react-router-transition';
import {CSSTransitionGroup} from 'react-transition-group';
import {Transition} from 'Transitions';
import NotifySwipe from 'NotifySwipe';
import Waypoint from 'react-waypoint';

const LeftContent = () => {
	return (
		<div className="col-sm-12 col-md-6 col-lg-6 bio-content">
			<div className="row about-title-left">
				<div className="col-sm-3 col-md-2 empty-border-button">
					<h5>
						<span className='code-arrows'>&#60;</span>about<span className='code-arrows'>&#62;</span>
					</h5>
				</div>
			</div>
			<div className="row bio-text">
				<div className="col-sm text-content">
					<p>
						I’m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor’s of technology and currently an adjunct lecturer at New York City College of Technology. I’m a natural problem solver; I enjoy finding efficient solutions to complex problems. I’m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. I’m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor’s of technology and currently an adjunct lecturer at New York City College of Technology. I’m a natural problem solver; I enjoy finding efficient solutions to complex problems. I’m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
					</p>
				</div>
			</div>
			<div className="row about-title-right">
				<div className="col-sm-3 col-sm-offset-9 col-md-2 col-md-offset-10 empty-border-button">
					<h5>
						<span className='code-arrows'>&#60;</span>/about<span className='code-arrows'>&#62;</span>
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

	componentDidMount() {
		this.props.onUnSwipeable();
	}

	renderRightContent() {
		return (
			<div className="col-sm-12 col-md-6 skill-content">
				<Browser vis={this.state.visualization}/>
				<SkillButtons handleClick={this.onClick.bind(this)}/>
				<div className="row skill-selectors">
					<div className="col-sm-4 skill-selectors-content-front-end empty-border-button" onClick={() => this.onClick('front-end')}>
						<h5>
							<span className='code-arrows'>&#60;</span>/FrontEnd<span className='code-arrows'>&#62;</span>
						</h5>
					</div>
					<div className="col-sm-4 skill-selectors-content-back-end empty-border-button" onClick={() => this.onClick('back-end')}>
						<h5>
							<span className='code-arrows'>&#60;</span>/BackEnd<span className='code-arrows'>&#62;</span>
						</h5>
					</div>
					<div className="col-sm-4 skill-selectors-content-dev-ops empty-border-button" onClick={() => this.onClick('front-end')}>
						<h5>
							<span className='code-arrows'>&#60;</span>/DevOps<span className='code-arrows'>&#62;</span>
						</h5>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<Transition settings={{
				transition: 'slide-up',
				time: 2000
			}}>
				<div key={this.props.location.key} className="col-sm-12 col-lg-8 col-lg-offset-2 about-me-content">
					<div ref='aboutMe' className="row page-title">
						<div className="col-sm-6 col-sm-offset-3">
							<h2>Hello,</h2>
							<p className="title-divider">■ ■ ■ ■</p>
						</div>
					</div>
					<div className="row about-total">
						{LeftContent()}
						{this.renderRightContent()}

					</div>
					<div className="row">
						<div className="col-sm-12">
							<NotifySwipe {...this.props}/>
						</div>
					</div>
				</div>
			</Transition>
		)
	}
}
