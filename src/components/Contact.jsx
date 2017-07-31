import React, {PropTypes} from 'react';
import NotifySwipe from 'NotifySwipe';
import ContactForm from 'ContactForm';
import {Transition} from 'Transitions';

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.onUnSwipeable();
	}

	componentWillUpdate() {
		console.log('will update');

	}
	componentDidUpdate() {
		console.log('did update');
	}

	componentWillReceiveProps() {
		console.log('will receive');

	}
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Transition settings={{
				transition: 'slide-up',
				time: 2000
			}}>
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
							<ContactForm/>
						</div>
					</div>
				</div>
				<NotifySwipe {...this.props}/>
			</Transition>
		)
	}
}
