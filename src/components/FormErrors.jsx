import React, {PropTypes} from 'react';

export const FormErrors = ({formErrors}) => <div className='formErrors error-box'>
	{Object.keys(formErrors).map((fieldName, i) => {
		if (formErrors[fieldName].length > 0) {
			return (
				<p key={i}>
					<svg id='x-error' viewBox="0 0 190 192.4"><path d="M147.5 192.4l-51.3-51-51 51L0 147l51.3-50.8L0 45.2 45.3 0l51 51 51.2-51 45 45-51 51 51 51z"/></svg>
					{fieldName}
					{formErrors[fieldName]}</p>
			)
		} else {
			return '';
		}
	})}
</div>
