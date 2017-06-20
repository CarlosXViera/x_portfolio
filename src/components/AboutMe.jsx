import React, { PropTypes } from 'react'

export default class AboutMe extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="grid-row">
				<div id="one" className="grid-xs-col-4 offset-xs-col-4 page-title">
					four
				</div>
				<div id="one" className="grid-xs-col-12 grid-md-col-6 left-content">
					four
				</div>
				<div id="two" className="grid-xs-col-12 grid-md-col-6 right-content">
					four
				</div>
			</div>
		)
	}
}
