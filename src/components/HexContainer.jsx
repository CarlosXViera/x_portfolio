import React, {PropTypes} from 'react'

export default function HexContainer({orientation, children}) {
	let viewBox = (orientation === 'landscape')
		? `0 0 ${window.innerWidth} ${window.innerHeight}`
		: `0 0 ${window.innerHeight} ${window.innerWidth}`;

	return (
		<svg id="main" className='hexcontainer' viewBox={viewBox} preserveAspectRatio="none">
			{children}
		</svg>
	)
}

HexContainer.propTypes = {
	orientation: PropTypes.string.isRequired,
	children: PropTypes.node
}
