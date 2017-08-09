import React from 'react';
import {Link} from 'react-router-dom';
import DefineGlasses from 'Glasses';
import {CSSTransitionGroup} from 'react-transition-group'

export const LogoButton = ({onHide}) => {
	return (
		<div className="col-sm-2 mobile-logo-button-container" onClick={onHide}>
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

export const Nav = ({onClick}) => {
	return (
		<div className='slide-nav' onClick={onClick}>
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

export const LogoSubTitle = () => {
	return (
		<div className='logo-subtitle'>
			<h5>
				<small>Viera.io
					<br/>Web Developer</small>
			</h5>
		</div>
	)
}

export const MobileNav = ({onShow, onHide}) => {

	return (
		<CSSTransitionGroup component='div' transitionName="nav-slide-up" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
			{onShow
				? <Nav key={'mobile-nav'} onClick={onHide}/>
				: <LogoSubTitle key={'logo-subtitle'} onClick={onHide}/>}
		</CSSTransitionGroup>
	)

}
