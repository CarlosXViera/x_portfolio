import React, {PropTypes} from 'react';
import Browser from 'Browser';
import SkillButtons from 'SkillButtons';
import {RouteTransition} from 'react-router-transition';

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
					<h6>
						A little about me...</h6>
					<p>
						I'm Carlos and I'm a tinkerer. I make things and break things and everything in between. Formally, however, I specialize in web development, adjunct at New York City College of Technology, and freelance on occasion. Recently received my Bachelors in Technology (Woo hoo!) and looking to work with start ups, or create my own. Some of my skills include; frontend, backend, design, mobile development and all the other good stuff.
						<br/>
						<span>Check the neat little browser on the right form more --></span>
					</p>

					<h6>
						A little about programming...</h6>

					<p>
						I love programming, friends say all I do is talk code (kind of weird because I think we all talk code, just not that's system-specific) I stared this journey about five or so years ago and it was love at first sight, just like the movie "Her", but without the mustache. Programming is modern day magic, it's art, its communication, and medium of self-reflection. To quote Kyle Simpson, who took the words out of my mouth, "...Code is at first and foremost a means of human communication, and only as a side-effect does it instruct the computer."
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
		) }; export default class AboutMe extends React.Component {constructor(props) {
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
						<div className="col-sm-4 skill-selectors-content-front-end empty-border-button hvr-rectangle-out skill-select" onClick={() => this.onClick('front-end')}>
							<h6>
								<span className='code-arrows'>&#60;</span>/FrontEnd<span className='code-arrows'>&#62;</span>
							</h6>
						</div>
						<div className="col-sm-4 skill-selectors-content-back-end empty-border-button hvr-rectangle-out skill-select" onClick={() => this.onClick('back-end')}>
							<h6>
								<span className='code-arrows'>&#60;</span>/BackEnd<span className='code-arrows'>&#62;</span>
							</h6>
						</div>
						<div className="col-sm-4 skill-selectors-content-dev-ops empty-border-button hvr-rectangle-out skill-select" onClick={() => this.onClick('front-end')}>
							<h6>
								<span className='code-arrows'>&#60;</span>/DevOps<span className='code-arrows'>&#62;</span>
							</h6>
						</div>
					</div>
				</div>
			)
		}

		render() {
			console.log(this.props.swipeType);
			return (
				<div key={this.props.location.key} className="col-sm-12 col-lg-8 col-lg-offset-2 about-me-content">
					<div ref='aboutMe' className="row page-title">
						<div className="col-sm">
							<h2>Hello,</h2>
							<p className="title-divider">■ ■ ■ ■</p>
						</div>
					</div>
					<div className="row about-total">
						{LeftContent()}
						{this.renderRightContent()}
					</div>
					<div className='row'>
						<div className='col-sm-6 col-sm-offset-3
							col-md-2 col-md-offset-5 col-lg-2 col-lg-offset-5 resume'>

							<a href="/assets/resume.pdf" download="resume.pdf" className='resume-button hvr-rectangle-out'>
								<h6>Download Resume</h6>
							</a>

						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<NotifySwipe {...this.props}/>
						</div>
					</div>
				</div>
			)
		}
}
