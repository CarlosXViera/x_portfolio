import React, {PropTypes} from 'react'
import {Link, IndexLink} from 'react-router-dom'

export default class Topbar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="bottom-border">
				<div className="top-bar">
					<h1 className="text-center">ElPolyGlotist.io</h1>
				</div>
			</div>
		)
	}
}
