import React, {PropTypes} from 'react';
import ImageGallery from 'react-image-gallery';
import uuid from 'node-uuid';
import ContentApi from 'ContentApi';
import WorkControls from 'WorkControls';
import {CSSTransitionGroup} from 'react-transition-group';
import {importAll} from 'utils';

const SwitchAnimation = ({children, location, beenHere}) => {
	let cssTransitionProps = beenHere
		? {
			transitionName: 'slideleft',
			transitionEnter: false,
			transitionLeave: false,
			transitionAppearTimeout: 500,
			transitionEnterTimeout: 500,
			transitionLeaveTimeout: 500
		}
		: {
			transitionName: 'slide-up',
			transitionAppear: true,
			transitionAppearTimeout: 500,
			transitionEnterTimeout: 500,
			transitionLeaveTimeout: 300
		};

	return (
		<CSSTransitionGroup {...cssTransitionProps}>
			{children}
		</CSSTransitionGroup>
	);

}

class WorkContent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			...ContentApi.getEverything(props.workId),
			currentPage: this.props.workId,
			alreadyBeenHere: false,
			direction: 'example'
		};
	}

	componentWillReceiveProps(a, b) {

		if (this.props.location.pathname !== a.location.pathname) {

			this.setState({
				...ContentApi.getEverything(a.workId),
				currentPage: a.workId,
				alreadyBeenHere: true
			})
		}

	}

	renderImgs() {
		let workImages = importAll(require.context('../assets/workImgs', false, /\.(png|jpe?g|svg)$/));
		console.log(workImages);
		let arr = this.state.images;
		return arr.map((filename, index) => {
			return {
				original: workImages[filename + '.png'],
				sizes: '507x900',
				thumbnail: workImages['thumbnail-' + filename + '.png']
			}
		});
	}

	renderRightNav(onClick, disabled) {
		return (<button className='image-gallery-right-nav hvr-forward' disabled={disabled} onClick={onClick}/>)
	}

	renderLeftNav(onClick, disabled) {

		return (<button className='image-gallery-left-nav hvr-backward' disabled={disabled} onClick={onClick}/>)
	}

	shouldComponentUpdate(a) {
		return (this.props.location.pathname !== a.location.pathname);
	}

	renderGallery(beenHere, settings, dir) {

		return !beenHere
			? (
				<div className="row image-gallery-container">
					<div className="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
						<ImageGallery {...settings}></ImageGallery>
					</div>
				</div>
			)
			: (
				<div className="row image-gallery-container">
					<div className="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
						<ImageGallery {...settings}></ImageGallery>
					</div>
				</div>
			);

	}
	render() {

		let settings = {
			showThumbnails: true,
			items: this.renderImgs(),
			slideInterval: 2000,
			renderLeftNav: this.renderLeftNav,
			renderRightNav: this.renderRightNav
		}

		return (
			<div key={this.props.location.key} className="col-sm-12 work-content-page">
				<div className="row page-title">
					<div className="col-sm-12">
						<h2>{this.state.title}</h2>
						<p className="title-divider">■ ■ ■ ■</p>
					</div>
				</div>
				{this.renderGallery(this.state.alreadyBeenHere, settings, this.state.direction)}
				<div className="row project-descriptor">
					<div className="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 description">
						<p>
							{this.state.description}
						</p>
					</div>
				</div>
				<WorkControls onNextOrPrev={this.props.onNextOrPrev} currentPage={this.state.currentPage}/>
				<div className='empty-space'></div>
			</div>
		)
	}
}

export default WorkContent;
