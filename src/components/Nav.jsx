import React, {PropTypes} from 'react'
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import Works from 'Works'
import Contact from 'Contact'
import About from 'About'
import Draggable from 'react-draggable';

export default class Nav extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			bounds: {}
		}
	}

	onStart(e, ui) {}

	onStop(e, ui) {}

	onDrag(e, ui) {

	}

	componentDidMount() {
		let main = document.getElementById('main');
		//top bar relative to the percentage. DPI changes.
		let topBar = document.getElementById('topBar').clientHeight + 1;
		this.setState({bounds: {
			top: -(main.offsetTop) + topBar,
			bottom: 0
		}})
	}
	componentWillMount() {}

	render() {
		const {bounds} = this.state;
		return (
			<Router>
				<Draggable axis="y" bounds={bounds} onDrag={this.onDrag}>
					<div className='Main' id='main'>
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
						<NavLink to="/about" className="tabText">
							<div className="tab blog">Blog</div>
						</NavLink>
					</div>
				</Draggable>
			</Router>
		)
	}
}
