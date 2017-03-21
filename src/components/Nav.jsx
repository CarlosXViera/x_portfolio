import React, {PropTypes} from 'react'
import {BrowserRouter as Router, Route, Link, Switch, NavLink} from 'react-router-dom'
import Works from 'Works'
import Contact from 'Contact'
import About from 'About'

export default class Nav extends React.Component {

	constructor(props) {
		super(props)

		this.state = {};
	}

	componentWillMount() {}

	render() {

		return (
			<Router>
				<div className='Main'>
					<div className="content">
						<Route path='/contacts' component={Contact}/>
						<Route path='/works' component={Works}/>
						<Route exact path='/' component={About}/>
					</div>
					<NavLink to="/contacts" className="tabText">
						<div className="tab contacts">Contact</div>
					</NavLink>

					<NavLink to="/works" className="tabText">
						<div className="tab works">Works</div>
					</NavLink>

					<NavLink to="/about" className="tabText">
						<div className="tab about">About</div>
					</NavLink>

				</div>
			</Router>
		)
	}
}
