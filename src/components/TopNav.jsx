import React, {PropTypes} from 'react';
import TopNavIcon from 'TopNavIcon';
import {Link} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';

const NavButton = () => {
	return (
		<div className="nav-button">
			<div className="nav-divider"></div>
			<div className="nav-divider"></div>
			<div className="nav-divider"></div>
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
			showDropDown: false
		}
	}

	handleShowDropDown() {
		this.setState({
			showDropDown: !this.state.showDropDown
		})
		console.log(this.state);
	}

	renderDropDown(state) {
		return state
			? (

				<div key={uuid('slide')} className="full-width-nav">
					<div onClick={this.handleShowDropDown.bind(this)}>
						<SlideNav/>
					</div>
				</div>
			)
			: '';

	}

	render() {
		/* TODO: DRY out render */

		return (
			<div className="row top-nav">
				<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="slide-down" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
					{this.renderDropDown(this.state.showDropDown)}
				</CSSTransitionGroup>
				<div className="col-sm-6 col-sm-offset-3 nav hidden-sm ">
					<div className="nav-item about">
						<Link to='/about'>
							<h5>About Me</h5>
						</Link>
					</div>
					<div className="nav-item blog">
						<a href="http://blog.viera.io">
							<h5>Blog</h5>
						</a>
					</div>
					<div className="nav-item home">
						<Link to='/'>
							<TopNavIcon/>
						</Link>
					</div>
					<div className="nav-item work">
						<Link to='/work'>
							<h5>Works</h5>
						</Link>
					</div>
					<div className="nav-item contact">
						<Link to='/contact'>
							<h5>Contact</h5>
						</Link>
					</div>
				</div>
				<div className='col-sm-3 col-sm-offset-9 nav-mobile hidden-md hidden-lg' onClick={this.handleShowDropDown.bind(this)}>
					<NavButton/>
				</div>
			</div>
		);
	}
}
