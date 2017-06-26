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
			showIndex: false,
			slideOnThumbnailHover: false,
			showBullets: true,
			infinite: true,
			showThumbnails: true,
			showFullscreenButton: true,
			showGalleryFullscreenButton: true,
			showPlayButton: true,
			showGalleryPlayButton: true,
			showNav: true,
			slideDuration: 450,
			slideInterval: 2000,
			thumbnailPosition: 'bottom',
			items: this.renderImgs()
		}
		return (
			<div className="grid-row">
				<div className="video-wrapper">
					<ImageGallery {...settings}></ImageGallery>
				</div>
			</div>
		)
	}
}
