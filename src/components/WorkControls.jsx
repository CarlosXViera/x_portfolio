import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {LeftArrow, RightArrow, Exit} from 'ControlsIcons';

export default class WorkControls extends React.Component {
	constructor(props) {
		super(props)
		this.urls = ['pressinggame', 'hmce', 'musicplayer', 'gravesendseye', 'deepspace'];
	}

	nextPage() {
		let currentIndex = this.urls.indexOf(this.props.currentPage);
		let nextPage = (currentIndex + 1) > (this.urls.length - 1)
			? null
			: `/work/${this.urls[currentIndex + 1]}`;
		this.currentPage = this.urls[currentIndex + 1];

		if (nextPage !== null) {
			return (
				<Link to={{
					pathname: nextPage,
					state: {
						transition: 'slideright'
					}
				}} replace>
					<RightArrow/>
				</Link>
			)
		}
	}

	prevPage() {
		let currentIndex = this.urls.indexOf(this.props.currentPage);
		let prevPage = (currentIndex - 1) < 0
			? null
			: `/work/${this.urls[currentIndex - 1]}`;

		if (prevPage !== null) {
			return (
				<Link to={{
					pathname: prevPage,
					state: {
						transition: 'slideleft'
					}
				}} replace>
					<LeftArrow/>
				</Link>
			)
		}
	}

	renderControls() {
		return (
			<div className="col-sm-4 col-sm-offset-4 work-controls-content">
				<svg id="work-controls" viewBox="-10 -10 185.81 50.3">
					<Link to={{
						pathname: '/work',
						state: {
							transition: 'slide-up'
						}
					}} replace>
						<Exit/>
					</Link>
					{this.nextPage()}
					{this.prevPage()}
				</svg>
			</div>
		)
	}

	render() {
		return (
			<div className="work-controls-partial">
				{this.renderControls()}
			</div>
		)
	}
}
