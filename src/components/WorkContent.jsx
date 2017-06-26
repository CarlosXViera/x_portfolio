import React, {PropTypes} from 'react';
import ImageGallery from 'react-image-gallery';
import uuid from 'node-uuid';
import ContentApi from 'ContentApi';

export default class WorkContent extends React.Component {
	constructor(props) {
		super(props)

	}

	state = {}
	handleImageLoad(event) {
		console.log('Image loaded ', event.target)

	}

	renderImgs() {
		let arr = ContentApi.getImages(this.props.workId);
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
			<div className="grid-row--center">

				<ImageGallery {...settings}></ImageGallery>

			</div>
		)
	}
}
