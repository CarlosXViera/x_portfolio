import React, {PropTypes} from 'react';
import TopNavIcon from 'TopNavIcon';
import {Link, withRouter} from 'react-router-dom';
import uuid from 'node-uuid';
import DefineGlasses from 'Glasses';
import {TimelineMax, Back} from 'gsap/src/minified/TweenMax.min';
import NavButton from 'NavButton';
import {SlideNav, LogoSubTitle, LogoButton} from 'MobileNav';
import MediaIcons from 'MediaIcons';
import {CSSTransitionGroup} from 'react-transition-group';

class TopNav extends React.Component {

	constructor(props) {
		super(props)
		this.colors = ['#259073', '#7FDA89', '#C8E98E', '#E6F99D']

		this.state = {
			show: false,
			atHome: this.props.location.pathname === '/'
		}
		this.mouseOverHome = this.mouseOverHome.bind(this);
	}

	componentDidMount() {}

	handleShowSlideIn({currentTarget}) {

		let arr = [...currentTarget.firstChild.children];

		let complete = this.handleShow.bind(this);

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

	componentDidMount() {
		setTimeout(() => this.hoverArrows = this.getTopNavHover(), 300);

	}

	getTopNavHover() {
		let arrows = this.refs.topper.children[0].children[0].children;

		let whiteArrows = [arrows[0], arrows[2]];
		let coloredArrows = [arrows[1], arrows[3]];
		let glasses = arrows[4];

		let arrowsTl = new TimelineMax({repeat: 1, yoyo: true});
		arrowsTl.to(whiteArrows, .5, {
			transformOrigin: '50% 50%',
			scale: 1.05,
			fill: '#259073',
			ease: Back.easeInOut
		});

		arrowsTl.fromTo(glasses, .5, {
			transformOrigin: '50% 50%',
			scale: .9
		}, {
			scale: 1.4,
			ease: Back.easeInOut
		}, .7);

		return arrowsTl.pause(0);
	}

	componentWillReceiveProps({location}) {
		location.pathname === '/'
			? this.setState({atHome: true})
			: this.setState({atHome: false});
	}

	componentDidUpdate() {}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.atHome != this.state.atHome) {
			return true;
		} else if (nextState.show != this.state.show) {
			return true;
		} else {
			return false;
		}

		// return nextState.show != this.state.show;
	}

	handleClick() {
		this.setState({
			...this.state,
			show: false
		})
	}

	handleShow() {
		this.setState({
			...this.state,
			show: true
		});
	}

	handleHide() {
		setTimeout(() => this.setState({
			...this.state,
			show: false
		}), 301)
	}

	mouseOverHome() {
		this.hoverArrows.restart();
	}

	renderSlideIn(show) {
		let slide = show
			? (
				<div onClick={this.handleHide.bind(this)}>
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

	showIcons(loc) {
		return loc
			? (
				<div></div>
			)
			: (<MediaIcons key={uuid('mediaIcon')}/>);
	}

	render() {
		/* TODO: DRY out render */

		return (
			<div className="row top-nav click-through-child">
				<div className="col-sm-2 col-md-offset-1 col-lg-offset-2 nav hidden-sm">
					<div onMouseOver={this.mouseOverHome} ref='topper' className="nav-item home">
						<Link to={{
							pathname: '/',
							state: {
								transition: 'bounce'
							}
						}}>
							<TopNavIcon appear={'appear'}/>
						</Link>
					</div>

					<div className="nav-item about hvr-underline-from-center hvr-grow">
						<Link to={{
							pathname: '/about',
							state: {
								transition: 'bounce'
							}
						}}>
							<h6>About Me</h6>
						</Link>
					</div>
					<div className="nav-item blog hvr-underline-from-center hvr-grow">
						<a href="http://blog.viera.io">
							<h6>Blog</h6>
						</a>
					</div>

					<div className="nav-item work hvr-underline-from-center hvr-grow">
						<Link to={{
							pathname: '/work',
							state: {
								transition: 'bounce'
							}
						}}>
							<h6>Works</h6>
						</Link>
					</div>
					<div className="nav-item contact hvr-underline-from-center hvr-grow">
						<Link to={{
							pathname: '/contact',
							state: {
								transition: 'bounce'
							}
						}}>
							<h6>Contact</h6>
						</Link>
					</div>
				</div>

				<div className='col-sm-1 col-sm-offset-8 col-md-offset-7 col-lg-offset-5 nav-item social hidden-sm'>
					<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="slide-left" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.showIcons(this.state.atHome)}
					</CSSTransitionGroup>

				</div>

				<div className="col-sm-12 hidden-md hidden-lg nav-mobile-container">
					<div className='row nav-mobile'>
						{this.renderSlideIn(this.state.show)}
						<LogoButton/>
						<LogoSubTitle show={this.state.show}/>
						<NavButton ref="navButton" show={this.state.show} onShow={this.handleShow.bind(this)} onHide={this.handleHide.bind(this)}/>
					</div>
				</div>

			</div>
		);
	}
}

export default withRouter(TopNav);
