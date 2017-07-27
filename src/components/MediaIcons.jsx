import React from 'react';
import {TweenLite} from "gsap";
import DrawSVGPlugin from 'DrawSVGPlugin';

class MediaIcons extends React.Component {

	constructor(props) {
		super(props);

		this.faceBook = 'https://www.facebook.com/people/Carlos-Viera/100010910018655';
		this.gitHub = 'https://github.com/carlosxviera';
		this.linkedIn = 'https://www.linkedin.com/in/cxviera/';

		this.strokeTo = {
			stroke: '#E6F99D',
			drawSVG: '0%'
		}

		this.strokeBackTo = {
			stroke: '#FFF',
			delay: 1,
			drawSVG: '100%'
		}

		this.mouseProps = {
			onMouseOver: this.handleMouseOver.bind(this),
			onMouseOut: this.handleMouseOut.bind(this),
			onClick: this.handleOnClick.bind(this)
		}

	}

	handleMouseOver({currentTarget}) {
		let g = currentTarget.children[0];

		TweenLite.to(g.firstChild, 1, this.strokeTo);
		TweenLite.to(g.lastChild, .3, {
			transformOrigin: '50% 50%',
			scale: .8,
			fill: '#E6F99D'
		})

	}

	handleMouseOut({currentTarget}) {
		let g = currentTarget.children[0];

		TweenLite.to(g.firstChild, 1, this.strokeBackTo);
		TweenLite.to(g.lastChild, 1, {
			transformOrigin: '50% 50%',
			scale: 1,
			fill: '#FFF',
			delay: .5
		})
	}
	handleOnClick({currentTarget, preventDefault}) {
		window.location.href = currentTarget.getAttribute('href');

		preventDefault();

		console.log(preventDefault);

	}

	faceBookIcon() {
		return (
			<a href={this.faceBook} {...this.mouseProps}>
				<g id="facebook" onClick={() => console.log(this)}>
					<rect width="25" height="24.9" x="66.7" y=".5" className="icon-border" rx="2" ry="2" fill="#FFF"/>
					<path d="M77.5 20h2.8v-7h2l.2-2.5h-2.2V9.3c0-.6 0-1 1-1h1.3V6h-2c-2.3 0-3 1-3 3v1.5H76V13h1.4z" className="icon"/>
				</g>
			</a>
		);
	};

	linkedInIcon() {
		return (
			<a href={this.linkedIn} {...this.mouseProps}>
				<g id="linkedin">
					<rect width="25" height="24.9" x=".5" y=".6" className="icon-border" rx="2" ry="2"/>
					<path d="M19.8 18.7v-5c0-2.7-1.4-4-3.3-4a3 3 0 0 0-2.6 1.5V10h-3v8.7h3v-5a2 2 0 0 1 0-.6 1.6 1.6 0 0 1 1.5-1c1 0 1.4.8 1.4 2v4.7zm-12-10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 1 0 0 3zm1.6 10V10h-3v8.7z" className="icon"/>
				</g>
			</a>
		);

	}

	gitHubIcon() {

		return (
			<a href={this.gitHub} {...this.mouseProps}>
				<g id="github">
					<rect width="25" height="24.9" x="33.6" y=".6" className="icon-border" rx="2" ry="2"/>
					<path d="M49 20.7h-4.2v-2c-2.8.6-3.6-1.6-3.6-1.6a6.3 6.3 0 0 0-1-1.4c-1-.6 0-.5 0-.5a2 2 0 0 1 1.5 1 2.4 2.4 0 0 0 3 1 2.5 2.5 0 0 1 .6-1.4c-2.2-.3-4-1.6-4-4.2s.4-3 1-3.6a3.2 3.2 0 0 1 0-2.5s1 0 2 1.5c.4-.5 2-.5 2.5-.5s2 0 2.6.5c1-1.5 2-1.5 2-1.5a3.2 3.2 0 0 1 0 2.5c.5.6 1 1 1 3.6s-2 4-4 4.2a2.8 2.8 0 0 1 .4 1.5v3.7z" className="icon"/>
				</g>
			</a>
		);

	}

	render() {
		return (
			<div className="row social-media-icons">
				<div className="col-sm-6 col-sm-offset-3 social-media-icons-content">
					<svg id="social-media-icons-item-svg" className="" viewBox=" 0 0 92.3 26">
						{this.linkedInIcon()}
						{this.gitHubIcon()}
						{this.faceBookIcon()}
					</svg>
				</div>
			</div>
		)
	}

}

export default MediaIcons;
