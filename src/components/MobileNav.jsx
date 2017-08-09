import React from 'react';
import {Link} from 'react-router-dom';
import DefineGlasses from 'Glasses';
import {CSSTransitionGroup} from 'react-transition-group'

export const LogoButton = () => {
	return (
		<div className="col-sm-2 mobile-logo-button-container">
			<Link to={{
				pathname: '/',
				state: {
					transition: 'bounce'
				}
			}}>
				<svg className="mobile-logo-button" viewBox="0 0 157 60">
					<DefineGlasses position={'Front'} transformation={'scale(.8)'}/>
				</svg>
			</Link>
		</div>
	)
}

export const SlideNav = () => {
	return (
		<div className='slide-nav'>
			<Link className='slide-nav-item' to={{
				pathname: '/about',
				state: {
					transition: 'bounce'
				}
			}}>
				<h5>About Me</h5>
			</Link>
			<a className='slide-nav-item' href="http://blog.viera.io">
				<h5>Blog</h5>
			</a>
			<Link className='slide-nav-item' to={{
				pathname: '/work',
				state: {
					transition: 'bounce'
				}
			}}>
				<h5>Works</h5>
			</Link>
			<Link className='slide-nav-item' to={{
				pathname: '/contact',
				state: {
					transition: 'bounce'
				}
			}}>
				<h5>Contact</h5>
			</Link>
		</div>
	)
}

export const LogoSubTitle = ({show}) => {
	const sub = !show
		? (
			<small>Viera.io
				<br/>Web Developer</small>
		)
		: '';

	return (
		<div className="col-sm-3 logo-subtitle">
			<h5>
				<CSSTransitionGroup transitionName='slideleft' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{sub}
				</CSSTransitionGroup>
			</h5>
		</div>
	)
}
