import React, {PropTypes} from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import AboutMe from 'AboutMe';
import Work from 'Work';
import Contact from 'Contact';
import Home from 'Home';
import Blog from 'Blog';
import TopNavIcon from 'TopNavIcon';

export default class TopNav extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	componentWillMount() {}

	render() {
		return (
			<Router>
				<div>
					<div className="grid-row top-nav">
						<div className="grid-xs-col-4 offset-xs-col-4 nav">
							<div className="tab about">
								<NavLink to="/aboutme" className="tabText">
									<h4>About Me</h4>
								</NavLink>
							</div>

							<div className="tab blog">
								<a href="http://blog.viera.io">
									<h4>Blog</h4>
								</a>
							</div>

							<div className="tab home">
								<NavLink to="/" className="tabText">
									<TopNavIcon/>
								</NavLink>
							</div>

							<div className="tab work">
								<NavLink to="/work" className="tabText">
									<h4>Works</h4>
								</NavLink>
							</div>

							<div className="tab contact">
								<NavLink to="/contact" className="tabText">
									<h4>Contact</h4>
								</NavLink>
							</div>
						</div>
					</div>

					<div>
						<Route path='/contact' component={Contact}/>
						<Route path='/work' component={Work}/>
						<Route path='/aboutme' component={AboutMe}/>
						<Route exact path='/' component={Home}/>
					</div>
				</div>
			</Router>
		);
	}
}
