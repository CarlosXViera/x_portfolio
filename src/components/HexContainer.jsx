import React, {PropTypes} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';

export default function HexContainer({orientation, children}) {
	let viewBox = (orientation === 'landscape')
		? `0 0 ${window.innerWidth} ${window.innerHeight}`
		: `0 0 ${window.innerHeight} ${window.innerWidth + 2000}`;

	return (

		<div>
			<svg id="main" className='hexcontainer' viewBox={viewBox} preserveAspectRatio="none">
				{children}
			</svg>
		</div>
	)
}

HexContainer.propTypes = {
	orientation: PropTypes.string.isRequired,
	children: PropTypes.node
}
