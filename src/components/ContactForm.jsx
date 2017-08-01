import React, {PropTypes} from 'react';
import {FormErrors} from 'FormErrors';

export default class ContactForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			subject: '',
			message: '',
			formErrors: {
				name: '',
				email: '',
				subject: '',
				message: ''
			},
			nameValid: false,
			emailValid: false,
			subjectValid: false,
			messageValid: false,
			formValid: false
		}

		this.submitForm = this.submitForm.bind(this);
	}
	submitForm() {

		fetch('/process_submit', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: this.state.name, email: this.state.email, subject: this.state.subject, message: this.state.message})
		})
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		}, () => this.validateField(name, value));
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let nameValid = this.state.nameValid;
		let emailValid = this.state.emailValid;
		let subjectValid = this.state.subjectValid;
		let messageValid = this.state.messageValid

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid
					? ''
					: ' - @ what exactly?';
				break;
			case 'name':
				nameValid = value.length >= 2;
				fieldValidationErrors.name = nameValid
					? ''
					: ' - who are you really?';
				break;
			case 'subject':
				subjectValid = value.length >= 2;
				fieldValidationErrors.subject = subjectValid
					? ''
					: ' - it helps, you know...';
				break;
			case 'message':
				messageValid = value.length >= 6;
				fieldValidationErrors.message = messageValid
					? ''
					: ' - erm... type a little more?';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			emailValid: emailValid,
			nameValid: nameValid,
			subjectValid: subjectValid,
			messageValid: messageValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			formValid: this.state.emailValid && this.state.nameValid && this.state.subjectValid && this.state.messageValid
		});
	}

	errorClass(error) {
		return (error.length === 0
			? ''
			: 'input-error');
	}

	render() {
		return (
			<div className='contact-form-container col-sm'>
				<div className='contact-form col-sm-10 col-sm-offset-1'>
					<div className='row square'>
						<div className='name col-sm-4'>
							<div className='name-content'>
								<label className='name'>Name:</label>
								<input name='name' className={` contact-input ${this.errorClass(this.state.formErrors.subject)}`} type='text' placeholder='Who are you?' onChange={(e) => this.handleUserInput(e)} value={this.state.name}/>
							</div>
						</div>
						<div className='email col-sm-4'>
							<div className='email-content'>
								<label>Email:</label>
								<input name='email' className={`contact-input ${this.errorClass(this.state.formErrors.email)}`} type='text' placeholder="What's your e-mail?" onChange={(e) => this.handleUserInput(e)} value={this.state.email}/>
							</div>
						</div>
						<div className='subject col-sm-4'>
							<div className='subject-content'>
								<label>Subject:</label>
								<input name='subject' className={`contact-input ${this.errorClass(this.state.formErrors.subject)}`} type='text' placeholder='Waddya want?' onChange={(e) => this.handleUserInput(e)} value={this.state.subject}/>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-sm message'>
							<label>Message:</label>
							<textarea name='message' onChange={(e) => this.handleUserInput(e)} className={`message-content ${this.errorClass(this.state.formErrors.message)}`} value={this.state.message}/>
						</div>
					</div>
					<div className='row'>
						<div className='submit col-sm-2 col-sm-offset-5'>
							<button onClick={this.submitForm} disabled={!this.state.formValid} className='hvr-rectangle-out submit-button'>Submit</button>
						</div>
					</div>
					<FormErrors formErrors={this.state.formErrors}/>

				</div>

			</div>

		);
	}
}

ContactForm.propTypes = {};
