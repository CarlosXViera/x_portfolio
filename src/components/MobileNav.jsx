import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Transition} from 'Transitions';
import {Link} from 'react-router-dom';
import DefineGlasses from 'Glasses';

export const LogoButton = () => {
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

export const SlideNav = () => {
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
				<Transition settings={{
					time: 300,
					transition: 'slide-left'
				}}>
					{sub}
				</Transition>
			</h5>
		</div>
	)

}
