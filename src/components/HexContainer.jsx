import React, {PropTypes} from 'react'

export default function HexContainer({orientation, children}) {
	let viewBox = (orientation === 'landscape')
		? `0 0 ${window.outerWidth} ${window.outerHeight}`
		: `0 0 ${window.outerHeight + 45} ${window.outerWidth + 45}`;

	let style = {
		width: `${window.outerWidth}px`,
		height: `${window.outerHeight}px`
	};

	return (
		<svg id="main" style={style} className='hexcontainer' viewBox={viewBox} preserveAspectRatio="none">
			{children}
		</svg>
	)
}

HexContainer.propTypes = {
	orientation: PropTypes.string.isRequired,
	children: PropTypes.node
}
