import React, {PropTypes} from 'react';
import TopNavIcon from 'TopNavIcon';
import {Link, withRouter} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';
import DefineGlasses from 'Glasses';
import {TimelineMax, Back} from 'gsap';
import NavButton from 'NavButton';
import {SlideNav, LogoSubTitle, LogoButton} from 'MobileNav';

class TopNav extends React.Component {

	constructor(props) {
		super(props)
		this.colors = ['#259073', '#7FDA89', '#C8E98E', '#E6F99D']

		this.state = {
			show: false
		}
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

	componentWillReceiveProps() {
		console.log('receiving');
	}

	componentDidUpdate() {
		console.log('topnav updated');
	}

	shouldComponentUpdate(nextProps, nextState) {

		return nextState.show != this.state.show;
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
		this.setState({
			...this.state,
			show: false
		});
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

	render() {

		/* TODO: DRY out render */

		return (
			<div className="row top-nav click-through-child">
				<div className="middle-line hidden-sm">
					<hr></hr>
				</div>

				<div className="col-sm-6 col-sm-offset-3 nav hidden-sm ">

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
