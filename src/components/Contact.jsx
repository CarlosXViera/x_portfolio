import React, {PropTypes} from 'react';
import NotifySwipe from 'NotifySwipe';
import ContactForm from 'ContactForm';
import {CSSTransitionGroup} from 'react-transition-group';

const ContactSubmit = ({shouldShow, onHide}) => {
	let contactSubmitStyle = {
		pointerEvents: shouldShow
			? 'all'
			: 'none'
	};
	return (
		<CSSTransitionGroup onClick={onHide} className='col-sm contact-submit' transitionName={'bounce'} style={contactSubmitStyle} component='div' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
			{shouldShow && (
				<div key={'contactModal'} onClick={onHide} className='contact-submit-content'>
					<h6>Cool, Ill get back to you soon!</h6>
				</div>
			)
}
		</CSSTransitionGroup>
	)
}

export default class Contact extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showModal: false
		}
		this.handleHide = this.handleHide.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}
	componentDidMount() {
		this.props.onUnSwipeable();
	}

	handleHide() {
		this.setState({showModal: false});
	}

	handleShow() {
		this.setState({showModal: true});
	}

	componentWillUpdate() {}
	componentDidUpdate() {}

	componentWillReceiveProps() {}

	render() {
		let {showModal} = this.state;
		return (
			<div key={this.props.location.key} className='row contact-page'>
				<div className='col-sm col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4 contact-page-content'>
					<div className="row page-title">
						<div className="col-sm-6 col-sm-offset-3">
							<h2>Contact Me</h2>
							<p className="title-divider">■ ■ ■ ■</p>
						</div>
					</div>
					<div className='row contact-info'>
						<div className='col-sm-8 col-sm-offset-2'>
							<p id='contact-info-content'>
								<span className='contact-span'>Email</span>: cx@viera.io
								<br/>
								<span className='contact-span'>Address</span>: 1296 Sheridan avenue, Bronx NY 10456.
								<br/>
								<span className='contact-span'>Telephone</span>: 347.284.7117
							</p>
						</div>
					</div>
					<div className="contact-container row">
						<ContactForm onShow={this.handleShow}/>
						<ContactSubmit onHide={this.handleHide} shouldShow={showModal}/>
					</div>
				</div>
			</div>
		)
	}
}
