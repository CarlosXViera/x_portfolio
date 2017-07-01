import React, {PropTypes} from 'react';
import ImageGallery from 'react-image-gallery';
import uuid from 'node-uuid';
import ContentApi from 'ContentApi';
import WorkControls from 'WorkControls';

class WorkContent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			...ContentApi.getEverything(props.workId),
			currentPage: this.props.workId
		};
	}

	componentWillReceiveProps(a, b) {}

	renderImgs() {
		let arr = this.state.images;
		return arr.map((filename, index) => {
			return {original: `/assets/${filename}.png`, sizes: '507x900'}
		});
	}

	render() {
		let settings = {
			showThumbnails: false,
			items: this.renderImgs(),
			slideInterval: 2000
		}

		return (
			<div className="col-sm-12 col-lg-10 col-lg-offset-1 work-content-page">
				<div className="row page-title">
					<div className="col-sm-6 col-sm-offset-3">
						<h1>{this.state.title}</h1>
						<p className="title-divider">■ ■ ■ ■</p>
					</div>
				</div>
				<div className="row image-gallery-container">
					<div className="col-sm-10 col-sm-offset-1">
						<ImageGallery {...settings}></ImageGallery>
					</div>
				</div>
				<div className="row project-descriptor">
					<div className="col-sm-6 col-sm-offset-3">
						<p>
							{this.state.description}
						</p>
					</div>
				</div>
				<WorkControls currentPage={this.state.currentPage}/>
			</div>
		)
	}
}

export default WorkContent;
