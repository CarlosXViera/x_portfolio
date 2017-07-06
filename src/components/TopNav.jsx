import React, {PropTypes} from 'react';
import TopNavIcon from 'TopNavIcon';
import {Link} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';
import DefineGlasses from 'Glasses';
import {TimelineMax, Back} from 'gsap';
import NavButton from 'NavButton';

const LogoButton = () => {
	return (

		<div className="col-sm-2 mobile-logo-button-container">
			<Link to="/">
				<svg className="mobile-logo-button" viewBox="0 0 157 60">
					<DefineGlasses position={'Front'} transformation={'scale(.8)'}/>
				</svg>
			</Link>
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
			<Link className='slide-nav-item' to='/work'>
				<h5>Works</h5>
			</Link>
			<Link className='slide-nav-item' to='/contact'>
				<h5>Contact</h5>
			</Link>
		</div>
	)
}

const LogoSubTitle = ({show}) => {
	const sub = !show
		? (
			<small>Viera.io
				<br/>Web Developer</small>
		)
		: '';

	return (
		<div className="col-sm-3 logo-subtitle">
			<h5>
				<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="slide-left" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{sub}
				</CSSTransitionGroup>
			</h5>
		</div>
	)

}

export default class TopNav extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showSlideIn: false
		}
		this.colors = ['#259073', '#7FDA89', '#C8E98E', '#E6F99D']
	}

	handleShowSlideIn({currentTarget}) {
		let arr = [...currentTarget.firstChild.children];

		let complete = () => {
			this.setState({
				showSlideIn: !this.state.showSlideIn
			})
			console.log(this.state);
		}

		if (this.state) {
			console.log('true');
		}

		this.tlArr = arr.map((item, i, a) => {
			let tl = new TimelineMax();
			let completeProp = (i === a.length - 1)
				? complete
				: () => {};

			return tl.to(item, .4, {
				transformOrigin: '50% 50%',
				x: -5,
				opacity: 0,
				repeat: 0,
				delay: .05 * i,
				backgroundColor: this.colors[i],
				ease: Back.easeOut,
				onComplete: completeProp
			});
		})

	}

	renderSlideIn(show) {
		let slide = show
			? (
				<div onClick={this.handleShowSlideIn.bind(this)}>
					<SlideNav/>
				</div>
			)
			: '';
		return (

			<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				{slide}
			</CSSTransitionGroup>
		)

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
				<div className='row nav-mobile hidden-md hidden-lg'>
					{this.renderSlideIn(this.state.showSlideIn)}
					<LogoButton/>
					<LogoSubTitle show={this.state.showSlideIn}/>

					<NavButton show={this.state.showSlideIn} onClick={this.handleShowSlideIn.bind(this)}/>
				</div>

			</div>
		);
	}
}
