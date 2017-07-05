import React, {PropTypes} from 'react';
import TopNavIcon from 'TopNavIcon';
import {Link} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';
import DefineGlasses from 'Glasses';

const NavButton = () => {
	return (
		<div className="col-sm-2 col-sm-offset-5 nav-button-container">
			<div className="nav-button">
				<div className="nav-divider"></div>
				<div className="nav-divider"></div>
				<div className="nav-divider"></div>
				<div className="nav-divider"></div>
			</div>
		</div>
	)
}

const LogoButton = () => {
	return (
		<div className="col-sm-2 mobile-logo-button-container">
			<svg className="mobile-logo-button" viewBox="0 0 157 55">
				<DefineGlasses position={'Front'} transformation={'scale(.8)'}/>
			</svg>
		</div>
	)
}
const SlideNav = () => {
	return (
		<div className='slide-nav'>
			<Link className='slide-nav-item' to='/about'>
				<h5>About Me</h5>
			</Link>
			<a className='slide-nav-item' href="http://blog.viera.io">
				<h5>Blog</h5>
			</a>
			<Link className='slide-nav-item-home' to='/'>
				<TopNavIcon/>
			</Link>
			<Link className='slide-nav-item' to='/work'>
				<h5>Works</h5>
			</Link>
			<Link className='slide-nav-item' to='/contact'>
				<h5>Contact</h5>
			</Link>
		</div>
	)
}

export default class TopNav extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showSlideIn: false
		}
	}

	handleShowSlideIn() {
		this.setState({
			showSlideIn: !this.state.showSlideIn
		})
		console.log(this.state);
	}

	renderSlideIn(state) {
		return state
			? (

				<div key={uuid('slide')} className="full-width-nav">
					<div onClick={this.handleShowSlideIn.bind(this)}>
						<SlideNav/>
					</div>
				</div>
			)
			: '';

	}

	renderBackDrop(state) {

		return state
			? (
				<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="example" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
					<div key={uuid('backDrop')} className="black-back-drop"></div>
				</CSSTransitionGroup>
			)
			: '';
	}

	render() {
		/* TODO: DRY out render */

		return (
			<div className="row top-nav">
				<div className="col-sm-6 col-sm-offset-3 nav hidden-sm ">
					<hr></hr>
					<div className="nav-item about hvr-pulse-shrink">
						<Link to='/about' className="">
							<h5>About Me</h5>
						</Link>
					</div>
					<div className="nav-item blog hvr-pulse-shrink">
						<a href="http://blog.viera.io">
							<h5>Blog</h5>
						</a>
					</div>
					<div className="nav-item home">
						<Link to='/'>
							<TopNavIcon/>
						</Link>
					</div>
					<div className="nav-item work hvr-pulse-shrink">
						<Link to='/work'>
							<h5>Works</h5>
						</Link>
					</div>
					<div className="nav-item contact hvr-pulse-shrink">
						<Link to='/contact'>
							<h5>Contact</h5>
						</Link>
					</div>
					<hr></hr>
				</div>

				<div className='row nav-mobile hidden-md hidden-lg' onClick={this.handleShowSlideIn.bind(this)}>
					<LogoButton/>
					<div className="col-sm-3 logo-subtitle">
						<h5>
							<small>Viera.io
								<br/>Web Developer</small>
						</h5>
					</div>
					<NavButton/>
				</div>

			</div>
		);
	}
}
