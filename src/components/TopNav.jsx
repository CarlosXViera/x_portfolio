import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import AboutMe from 'AboutMe';
import Work from 'Work';
import Contact from 'Contact';
import Home from 'Home';
import Blog from 'Blog';

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
            <div className="grid-md-col-6 offset-md-col-3 grid-sm-col-12 nav">
                <div className="tab about">
                <NavLink to="/aboutme" className="tabText">
                  About Me
                </NavLink>
                </div>

                <div className="tab blog">
                <NavLink to="/blog" className="tabText">
                  Blog
                </NavLink>
                </div>

                <div className="tab home">
                <NavLink to="/" className="tabText">
                  Home
                </NavLink>
                </div>

                <div className="tab work">
                <NavLink to="/work" className="tabText">
                  Works
                </NavLink>
                </div>

                <div className="tab contact">
                <NavLink to="/contact" className="tabText">
                  Contact
                </NavLink>
                </div>
            </div>
          </div>

          <div>
            <Route path='/contact' component={Contact}/>
            <Route path='/work' component={Work}/>
            <Route path='/blog' component={Blog}/>
            <Route path='/aboutme' component={AboutMe}/>
            <Route exact path='/' component={Home}/>
          </div>
        </div>
      </Router>
		);
	}
}
