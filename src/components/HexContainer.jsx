import React, {PropTypes} from 'react'

export default function HexContainer({orientation, children}) {
	let viewBox = (orientation === 'landscape') ? '0 0 1280 720' : '0 0 720 1280';

		return (
			<svg className='hexcontainer' viewBox={viewBox} preserveAspectRatio='xMinYMin meet'>
				{children}
			</svg>
		)
}

HexContainer.propTypes = {
	orientation: PropTypes.string.isRequired,
	children: PropTypes.node
}
