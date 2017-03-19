import React, {PropTypes} from 'react'
import { Link, Route, Router } from 'react-router-dom'

export default class Nav extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Link to="/about">About</Link>
				<Link to="/contacts">Contact</Link>
				<Link to="/works">Works</Link>
			</div>
		)
	}
}
