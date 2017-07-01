import React, {PropTypes} from 'react';
import TopNavIcon from 'TopNavIcon';
import {Link} from 'react-router-dom';

export default class TopNav extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		/* TODO: DRY out render */

		return (
			<div className="row top-nav">
				<div className="col-sm-6 col-sm-offset-3 nav">
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
			</div>
		);
	}
}
