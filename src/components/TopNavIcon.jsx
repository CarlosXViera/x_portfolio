import React from 'react';
import DefineGlasses from 'Glasses';

const TopNavIcon = () => {

	return (
		<svg id="top-nav-icon" viewBox="0 0 99 111">
			<path d="M87.6 78.6a3.8 3.8 0 0 0 1.8-3v-42a3.8 3.8 0 0 0-1.8-3L51.4 10a3.8 3.8 0 0 0-3.5 0l-36.3 21a3.8 3.8 0 0 0-1.7 3v41.8a3.8 3.8 0 0 0 1.7 3l36.2 21a3.8 3.8 0 0 0 3.4 0z" className="icon-hexagon"/>
			<path d="M68.8 27.4l13.6 7.8a1.4 1.4 0 0 1 .5 1v20l1.3-1v-19a2.7 2.7 0 0 0-1.3-2l-13.3-7.8z" className="colored-arrow"/>
			<path d="M16.4 56V36.3a1.4 1.4 0 0 1 .6-1l13-7.5-1-1-12.7 7.4a2.7 2.7 0 0 0-1.2 2.2V57z" className="colored-arrow"/>
			<path d="M34.5 25L49 16.8a1.4 1.4 0 0 1 1.2 0L64.5 25l1-1L51 15.5a2.7 2.7 0 0 0-2.6 0l-15 8.7z" className="white-arrow"/>
			<path d="M83 61.8v11.5a1.4 1.4 0 0 1-.6 1L69 82l.4 1.4 13.6-8a2.7 2.7 0 0 0 1.2-2V61z" className="white-arrow"/>
			<path d="M64.8 84.5L50.2 93a1.4 1.4 0 0 1-1 0l-15.6-9 .4 1.7L48.4 94a2.7 2.7 0 0 0 2.5 0l14-8.2z" className="colored-arrow"/>
			<path d="M28 80.8l-11-6.5a1.4 1.4 0 0 1-.6-1V62l-1.3.8v10.5a2.7 2.7 0 0 0 1.4 2.2l12 7z" className="white-arrow"/>
			<DefineGlasses position={'Front'} transformation='translate(25 47.5)scale(.25)'/>
		</svg>
	)
}

export default TopNavIcon;
