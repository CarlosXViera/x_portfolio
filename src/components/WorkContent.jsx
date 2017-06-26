import React, {PropTypes} from 'react';
import ImageGallery from 'react-image-gallery';
import uuid from 'node-uuid';
import ContentApi from 'ContentApi';
import WorkControls from 'WorkControls';

export default class WorkContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = ContentApi.getEverything(props.workId);
	}
	handleImageLoad(event) {
		console.log('Image loaded ', event.target)

	}

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
			<div className="grid-row--no-gutter">
				<div className="grid-row--center">
					<div className="grid-xs-col-4 offset-xs-col-4 page-title">
						<h1>{this.state.title}</h1>
						<p className="title-divider">■ ■ ■ ■</p>
					</div>
				</div>
				<div className="grid-row-center">
					<ImageGallery {...settings}></ImageGallery>
				</div>
				<div className="grid-row--center project-descriptor">
					<div className="grid-xs-col-4 offset-xs-col-4">
						<p>
							{this.state.description}
						</p>
					</div>
				</div>
				<WorkControls/>
			</div>
		)
	}
}
