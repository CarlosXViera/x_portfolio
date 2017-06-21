import React from 'react';

const MediaIcons = () => {

	const FaceBook = 'https://www.facebook.com/people/Carlos-Viera/100010910018655';
	const GitHub = 'https://github.com/carlosxviera';
	const LinkedIn = 'https://www.linkedin.com/in/cxviera/';

	const FaceBookIcon = (link) => {

		return (
			<a href={link}>
				<g id="github">
					<rect width="25" height="24.9" x="66.7" y=".5" className="icon-border" rx="2" ry="2"/>
					<path d="M77.5 20h2.8v-7h2l.2-2.5h-2.2V9.3c0-.6 0-1 1-1h1.3V6h-2c-2.3 0-3 1-3 3v1.5H76V13h1.4z" className="icon"/>
				</g>
			</a>
		);
	};

	const LinkedInIcon = (link) => {

		return (
			<a href={link}>
				<g id="facebook">
					<path d="M19.8 18.7v-5c0-2.7-1.4-4-3.3-4a3 3 0 0 0-2.6 1.5V10h-3v8.7h3v-5a2 2 0 0 1 0-.6 1.6 1.6 0 0 1 1.5-1c1 0 1.4.8 1.4 2v4.7zm-12-10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 1 0 0 3zm1.6 10V10h-3v8.7z" className="icon"/>
					<rect width="25" height="24.9" x=".5" y=".6" className="icon-border" rx="2" ry="2"/>
				</g>
			</a>
		);
	};

	const GitHubIcon = (link) => {

		return (
			<a href={link}>
				<g id="linkedin">
					<rect width="25" height="24.9" x="33.6" y=".6" className="icon-border" rx="2" ry="2"/>
					<path d="M49 20.7h-4.2v-2c-2.8.6-3.6-1.6-3.6-1.6a6.3 6.3 0 0 0-1-1.4c-1-.6 0-.5 0-.5a2 2 0 0 1 1.5 1 2.4 2.4 0 0 0 3 1 2.5 2.5 0 0 1 .6-1.4c-2.2-.3-4-1.6-4-4.2s.4-3 1-3.6a3.2 3.2 0 0 1 0-2.5s1 0 2 1.5c.4-.5 2-.5 2.5-.5s2 0 2.6.5c1-1.5 2-1.5 2-1.5a3.2 3.2 0 0 1 0 2.5c.5.6 1 1 1 3.6s-2 4-4 4.2a2.8 2.8 0 0 1 .4 1.5v3.7z" className="icon"/>
				</g>
			</a>
		);
	};

	return (
		<svg id="social-media-icons" viewBox="0 0 92.3 26">
			{LinkedInIcon(LinkedIn)}
			{GitHubIcon(GitHub)}
			{FaceBookIcon(FaceBook)}
		</svg>
	)
}

export default MediaIcons;
