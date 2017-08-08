import React from 'react';
import {TimelineMax, Back, Power4} from 'gsap/src/minified/TweenMax.min';

const Server = (transform) => {
	return (
		<g>
			<path d="M270 5.5V15h4.7V5.6zm3.7 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.6zm0-2.8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.4zm0-2.8a.4.4 0 1 1 .4-.6.4.4 0 0 1-.3.5zM195.5 5.5V15h4.8V5.6zm1 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.6zm0-2.8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.4zm0-2.8a.4.4 0 1 1 .4-.6.4.4 0 0 1-.5.5z" className="server-hinge"/>
			<path d="M271.6 3H199a1 1 0 0 0-1 1v12.6a1 1 0 0 0 1 1h72.6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM235 14a3.3 3.3 0 1 1 3.3-3.3 3.3 3.3 0 0 1-3.3 3.3zm21.4 1.3h-.4V5.6h.4zm1 0h-.5V5.6h.3zm.8 0h-.4V5.6h.4zm1 0h-.5V5.6h.4zm.8 0h-.4V5.6h.4zm1 0h-.5V5.6h.4zm.8 0h-.5V5.6h.5zm1 0h-.6V5.6h.5zm.8 0h-.5V5.5h.6zm.8 0h-.4V5.6h.4z"/>
			<circle cx="267.8" cy="6.2" r=".8" className="power-button"/>
			<path d="M267.4 8.3h.8v7h-.8z" className="line-light"/>
		</g>
	)

}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.gearsMouseOver = this.gearsMouseOver.bind(this);
		this.gearsMouseOut = this.gearsMouseOut.bind(this);
		this.laptopMouseOver = this.laptopMouseOver.bind(this);
		this.laptopMouseOut = this.laptopMouseOut.bind(this);
		this.getLaptopMouseOver = this.getLaptopMouseOver.bind(this);
		this.getServerMouseOver = this.getServerMouseOver.bind(this);
		this.serverMouseOut = this.serverMouseOut.bind(this);
		this.serverMouseOver = this.serverMouseOver.bind(this)
	}

	componentDidMount() {

		setTimeout(() => {
			this.onLaptopMouseOver = this.getLaptopMouseOver();
			this.onGearsMouseOver = this.getGearsMouseOver();
			this.onServerMouseOver = this.getServerMouseOver();
		}, 301)

	}

	serverMouseOver() {
		this.onServerMouseOver.play();
	}
	serverMouseOut() {
		this.onServerMouseOver.reverse();
	}

	getServerMouseOver() {
		let serverTl = new TimelineMax({});
		let server = [this.server1, this.server2, this.server3, this.server4];
		serverTl.staggerFromTo(server, .3, {
			opacity: 1,
			x: 0,
			ease: Power4.easeOut
		}, {
			opacity: 0,
			x: 10,
			ease: Power4.easeIn
		}, .1);
		serverTl.staggerFromTo(server, .5, {
			x: -10,
			ease: Power4.easeOut,
			delay: .3
		}, {
			opacity: 1,
			x: 0,
			ease: Power4.easeIn
		}, .1);

		return serverTl.addLabel('sever-mouse-over').pause(.1);
	}

	getGearsMouseOver() {
		let gearsTl = new TimelineMax();

		gearsTl.to(this.gearTop, 1.5, {
			transformOrigin: '50% 50%',
			fill: '#C8E98E',
			rotation: 360,
			ease: Power4.easeIn
		});
		gearsTl.to(this.gearBottom, 1.5, {
			transformOrigin: '50% 50%',
			fill: '#7FDA89',
			rotation: -360,
			ease: Power4.easeIn
		}, 0);

		return gearsTl.addLabel('gears-mouse-over').pause(0);
	}

	gearsMouseOver(e) {
		e.stopPropagation();
		this.onGearsMouseOver.play()
	}
	gearsMouseOut(e) {
		e.stopPropagation();
		this.onGearsMouseOver.reverse()
	}

	laptopMouseOver(e) {
		e.stopPropagation();

		this.onLaptopMouseOver.mouseOver.play();
	}
	laptopMouseOut(e) {
		e.stopPropagation();
		this.onLaptopMouseOver.mouseOver.reverse();
	}

	getLaptopMouseOver() {

		let laptopMouseOverTl = new TimelineMax({});
		let laptopMouseOutTl = new TimelineMax({});
		let laptopFrames = [this.frame1, this.frame2, this.frame3];

		laptopMouseOverTl.staggerFromTo(laptopFrames, .7, {
			scale: 2,
			opacity: 0,
			ease: Back.easeOut
		}, {
			scale: 1,
			opacity: 1,
			ease: Back.easeOut
		}, .5);

		laptopMouseOutTl.fromTo(laptopFrames, .7, {
			scale: 1,
			opacity: 1,
			ease: Back.easeIn
		}, {
			transformOrigin: '50% 50%',
			scale: 0,
			opacity: 0,
			ease: Back.easeIn
		}, 0);

		return {mouseOver: laptopMouseOverTl.addLabel('laptop-mouse-out').pause(0), mouseOut: laptopMouseOutTl.addLabel('laptop-mouse-out').pause(1)}

	}

	renderServer(onClick) {
		return (
			<g id="server" onMouseLeave={this.serverMouseOut} onMouseEnter={this.serverMouseOver} onClick={() => onClick('backEnd')}>
				<g ref={r => this.server1 = r}>
					<Server/>
				</g>
				<g ref={r => this.server2 = r} transform='translate(0, 15)'>
					<Server/>
				</g>
				<g ref={r => this.server3 = r} transform='translate(0, 30)'>
					<Server/>
				</g>
				<g ref={r => this.server4 = r} transform='translate(0, 45)'>
					<Server/>
				</g>
				<rect onClick={() => console.log('back-end')} fill='rgba(0,0,0,0)' x='195' width='80' height='65'></rect>
			</g>
		)
	}

	renderLaptop(onClick) {
		return (
			<g id="laptop" onMouseLeave={this.laptopMouseOut} onMouseEnter={this.laptopMouseOver} onClick={() => onClick('frontEnd')}>
				<path d="M94.2 4.4H15.8A3.5 3.5 0 0 0 12.3 8v53a3.5 3.5 0 0 0 3.5 3.4h78.4a3.5 3.5 0 0 0 3.5-3.5V8a3.5 3.5 0 0 0-3.5-3.6zM94 57.6H16v-49H94z" ref={ref => this.latopFrame = ref} className="d"/>
				<rect id='laptop-frame1' ref={ref => this.frame1 = ref} width="27.3" height="45.3" x="18.6" y="11" rx="2" ry="2"/>
				<rect id='laptop-frame2' width="44.1" ref={ref => this.frame2 = ref} height="20.3" x="47.6" y="12" rx="2" ry="2"/>
				<rect id='laptop-frame3' width="44.1" ref={ref => this.frame3 = ref} height="20.3" x="47.6" y="34.5" rx="2" ry="2"/>
				<path d="M0 60.8V64a9.4 9.4 0 0 0 1.3 0h107.4a9.5 9.5 0 0 0 1.3 0v-3.2z"/>
				<path d="M55.5 6.8a.5.5 0 0 1-.5.5.5.5 0 1 1 0-1 .5.5 0 0 1 .5.5z"/>
				<path d="M45.8 60.8a1.4 1.4 0 0 0 1.3 1.7h16a1.4 1.4 0 0 0 1.3-1.4 1.2 1.2 0 0 0 0-.2z" className="inset"/>
				<rect fill='rgba(0,0,0,0)' x='3' width='105' height='65'></rect>
			</g>
		)
	}

	renderGears(onClick) {
		return (
			<g id="gears" onMouseEnter={this.gearsMouseOver} onMouseLeave={this.gearsMouseOut} onClick={() => onClick('devOps')}>
				<path ref={ref => this.gearTop = ref} className="d" d="M394.2 55.4l2.5-1.4a1 1 0 0 0 .6-1 14.4 14.4 0 0 1 0-1.8.7.7 0 0 0-.4-.7l-2.3-1.3a.5.5 0 0 1-.3-.7c.4-1 1-2.2 1.2-3.4 0-.3.4-.3.7-.3l2.5.4a.7.7 0 0 0 .8-.2c.3-.6.8-1 1.2-1.7a.8.8 0 0 0 0-.5c-.2-.8-.5-1.7-1-2.5 0-.3 0-.5.3-.7l3-2a.5.5 0 0 1 .8 0l1.8 1.8a.7.7 0 0 0 .8.3 15 15 0 0 1 2-.5.7.7 0 0 0 .5-.7c0-.7.3-1.6.5-2.5a.4.4 0 0 1 .5-.3h3.6c.4 0 .5 0 .6.5 0 .8.3 1.7.4 2.5a.7.7 0 0 0 .6.7 11.4 11.4 0 0 1 1.7.5.8.8 0 0 0 1 0c.6-.8 1.4-1.4 2.2-2l3.6 2.6-1.3 2.8a.8.8 0 0 0 0 1c.5.5.8 1 1 1.6a1 1 0 0 0 .8.3c1 0 1.8 0 2.7-.2a.5.5 0 0 1 .6.4l1 3.4c0 .3 0 .5-.3.6l-2.3 1.3a.7.7 0 0 0-.5.7v2a.7.7 0 0 0 .4.6L428 56a.4.4 0 0 1 .2.7l-1.2 3.3a.5.5 0 0 1-.6.5L424 60a.7.7 0 0 0-.7.4c-.4.6-1 1-1.2 1.6a1 1 0 0 0 0 .8l1 2.5a.5.5 0 0 1-.2.6l-3 2a.5.5 0 0 1-.7 0l-1.8-2a.7.7 0 0 0-.8 0l-1.8.5c-.3 0-.5.2-.6.5l-.6 2.5a.6.6 0 0 1-.8.6h-3.3c-.4 0-.5 0-.6-.6 0-.8-.3-1.7-.5-2.5a1 1 0 0 0-.5-.7 17.8 17.8 0 0 0-2-.7.8.8 0 0 0-.6 0l-2 2a.5.5 0 0 1-.7 0l-2.8-2.2a.5.5 0 0 1-.2-.8l1-2.3a.7.7 0 0 0 0-1l-1-1.5a.8.8 0 0 0-.7-.3H396a.6.6 0 0 1-.7-.3l-1-3.8zm27-2.6a9.7 9.7 0 1 0-10.2 9.5 9.7 9.7 0 0 0 10-9.5z"/>
				<path ref={ref => this.gearBottom = ref} d="M415 31.8l2.8-2.5a1.3 1.3 0 0 0 .5-1.6 19 19 0 0 1-.5-2.2.8.8 0 0 0-.7-.8l-3.2-1a.6.6 0 0 1-.5-.8l.5-5c0-.3.3-.5.7-.5l3.3-.3a1 1 0 0 0 1-.6l1-2.6a1 1 0 0 0 0-.8l-2-3c-.3-.2-.4-.5 0-1 1-1 2-2 3-3.3a.7.7 0 0 1 1-.2l3 1.6a1 1 0 0 0 1 0 19.7 19.7 0 0 1 2.2-1.2 1 1 0 0 0 .6-1V1.7c0-.4.2-.6.6-.7l4.6-1a.6.6 0 0 1 .8.4c.5 1 1 2 1.4 3.2a1 1 0 0 0 1 .7 15 15 0 0 1 2.3.2 1 1 0 0 0 1.2-.4l2.4-3L448 3l-.8 3.7a1 1 0 0 0 .5 1.4l1.7 1.6a1.2 1.2 0 0 0 1 .2l3.3-1a.7.7 0 0 1 1 .4c.6 1.3 1.4 2.7 2.2 4a.6.6 0 0 1-.2 1l-2.6 2.3a1 1 0 0 0-.3 1c.3.7.5 1.5.6 2.3a1 1 0 0 0 .7.8c1.2.5 2.3 1 3.4 1.2a.6.6 0 0 1 .4.8c0 1.5-.2 3-.4 4.6a.7.7 0 0 1-.7.8c-1.2 0-2.3.2-3.4.3a1 1 0 0 0-1 .7c-.2.8-.7 1.5-1 2.4a1.3 1.3 0 0 0 0 1l2 2.8a.6.6 0 0 1 0 1l-3 3.4a.7.7 0 0 1-1 0l-3-1.6a1 1 0 0 0-1 0l-2.2 1.3a1 1 0 0 0-.6 1v3.2c0 .5-.2.8-.8 1-1.5 0-3 .4-4.3.8a.7.7 0 0 1-1-.6c-.4-1-.8-2-1.4-3a1.2 1.2 0 0 0-.7-.6 23.4 23.4 0 0 0-2.7-.3 1 1 0 0 0-1 .3l-2 3a.6.6 0 0 1-1 .2l-4.2-2a.7.7 0 0 1-.5-1l.8-3.2a1 1 0 0 0-.3-1l-2-1.8a1 1 0 0 0-.8-.2l-3.4 1a.7.7 0 0 1-1-.4l-2.6-4.4zm33.7-11.5a12.7 12.7 0 1 0-10 15.2 12.8 12.8 0 0 0 10-15.2z" className="d"/>
				<rect fill='rgba(0,0,0,0)' x='390' width='75' height='65'></rect>
			</g>
		)

	}

	render() {
		return (
			<div className="row skill-buttons">
				<div className="col-sm-10 col-sm-offset-1 skill-button-content">
					<svg id="skill-icons-item-svg" viewBox="0 0 459.2 70">
						{this.renderLaptop(this.props.handleClick)}
						{this.renderGears(this.props.handleClick)}
						{this.renderServer(this.props.handleClick)}
					</svg>
				</div>
			</div>
		)
	}

}
