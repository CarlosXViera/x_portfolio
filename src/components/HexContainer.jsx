import React, {PropTypes} from 'react'

export default function HexContainer({orientation, children}) {
	console.log(orientation);
	let viewBox = (orientation === 'landscape') ? '0 0 1600 900' : '0 0 900 1600';

		return (
			<svg className='hexcontainer' viewBox={viewBox}>
				{children}
			</svg>
		)
}

HexContainer.propTypes = {
	orientation: PropTypes.string.isRequired,
	children: PropTypes.node
}
