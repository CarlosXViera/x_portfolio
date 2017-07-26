import React, {PropTypes} from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import WorkContent from 'WorkContent';
import {CSSTransitionGroup} from 'react-transition-group';
import NotifySwipe from 'NotifySwipe';

/* TODO: Cleanup SVG transforms/tags.
*/

const SVG = ({location, match}) => {
	return (
		<div className="col-sm work-content">
			<svg id="work-item-svg" viewBox="0 0 707.8 483.1">
				<defs>
					<clipPath id="a">
						<path d="M588 405.7V272.2l-115.5-66.8-115.7 66.8v133.5l115.7 66.8L588 405.7z" className="a"/>
					</clipPath>
				</defs>
				<path id="blank" className="click-through-child" d="M346.5 408.2a9.6 9.6 0 0 0 4.3-7.5V277.2a9.6 9.6 0 0 0-4.3-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0l-107 61.7a9.6 9.6 0 0 0-4.3 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z" className="b"/>
				<NavLink className="click-through-child" to={`${match.url}/deepspace`}>
					<g id="deep-space" className="c">
						<path id="deep-space-border" d="M583.8 408.2a9.6 9.6 0 0 0 4.3-7.5V277.2a9.6 9.6 0 0 0-4.2-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0l-107 61.7a9.6 9.6 0 0 0-4.2 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5L468 470a9.6 9.6 0 0 0 8.8 0z" className="b"/>
						<circle cx="351.4" cy="354.1" r="128.5" className="b"/>
						<circle cx="401.9" cy="307.6" r="5.8" className="b"/>
						<ellipse cx="407.1" cy="291.2" className="b" rx="8.7" ry="10.3" transform="rotate(-54.91 407.06 291.2)"/>
						<ellipse cx="417.7" cy="324.1" className="b" rx="5.4" ry="7.3" transform="rotate(-2.73 417.23 323.82)"/>
						<ellipse cx="382.9" cy="317.4" className="b" rx="9" ry="9.3"/>
						<ellipse cx="445" cy="322.2" className="b" rx="1.3" ry="1.9" transform="rotate(-22.61 445.05 322.24)"/>
						<ellipse cx="441" cy="313.1" className="b" rx="1.7" ry="2.9" transform="rotate(-31.79 444.69 312.65)"/>
						<ellipse cx="454" cy="324.5" className="b" rx="1.7" ry="2.9" transform="rotate(-13.2 454.02 324.53)"/>
						<ellipse cx="467.3" cy="312.6" className="b" rx=".9" ry="2.9" transform="rotate(-17.43 467.46 312.69)"/>
						<ellipse cx="461.1" cy="314.1" className="b" rx=".5" ry="1.5" transform="rotate(-17.43 461.18 314.2)"/>
						<ellipse cx="456.1" cy="313.4" className="b" rx="1.2" ry="2" transform="rotate(-22.61 456.17 313.46)"/>
						<ellipse cx="445.8" cy="300.4" className="b" rx="1.8" ry="3.5" transform="rotate(-30 445.8 300.43)"/>
						<ellipse cx="465.1" cy="308" className="b" rx=".3" ry="1.1" transform="rotate(-17.43 465.3 308.05)"/>
						<ellipse cx="458.5" cy="332.3" className="b" rx="1.7" ry="3.7" transform="rotate(-10.18 458.25 332.15)"/>
						<circle cx="366.3" cy="385.9" r="6.1" className="b"/>
						<ellipse cx="387.3" cy="395.8" className="b" rx="10.8" ry="11.3"/>
						<ellipse cx="401.6" cy="411.6" className="b" rx="4.8" ry="5.4"/>
						<ellipse cx="421.9" cy="409.7" className="b" rx="4.6" ry="4" transform="rotate(-54.91 421.87 409.72)"/>
						<ellipse cx="369.7" cy="431.8" className="b" rx="5.1" ry="4.3"/>
						<ellipse cx="383.3" cy="439.3" className="b" rx="8.5" ry="6.5"/>
						<ellipse cx="405.2" cy="434.8" className="b" rx="4.2" ry="2.4" transform="rotate(-30 405.22 434.8)"/>
						<ellipse cx="443.4" cy="342.3" className="b" rx="8.8" ry="11.4"/>
						<ellipse cx="446.9" cy="391" className="b" rx="7.2" ry="5.3" transform="rotate(-60 446.89 391.01)"/>
						<ellipse cx="459.8" cy="358.1" className="b" rx="1.3" ry="2.7"/>
						<ellipse cx="477.5" cy="359.9" className="b" rx=".5" ry="2.2"/>
						<ellipse cx="393.2" cy="356.9" className="b" rx="4.8" ry="5.2"/>
						<circle cx="411.9" cy="365.6" r="3.4" className="b"/>
						<ellipse cx="372.7" cy="288.4" className="b" rx="3.8" ry="5.2"/>
						<ellipse cx="380.8" cy="246.2" className="b" rx="1.2" ry="3.1" transform="rotate(-80.66 380.85 246.16)"/>
						<ellipse cx="372.8" cy="237.2" className="b" rx="2.7" ry="5.2" transform="rotate(-73.51 372.78 237.2)"/>
						<ellipse cx="430.3" cy="272.2" className="b" rx="4.6" ry="7" transform="rotate(-40.44 430.34 272.22)"/>
						<ellipse cx="381.9" cy="269.2" className="b" rx="5.4" ry="4.1"/>
						<ellipse cx="371.4" cy="268.7" className="b" rx="4" ry="2.4"/>
						<circle cx="414.8" cy="351.9" r="1.8" className="b"/>
						<circle cx="421.1" cy="395.3" r="3.3" className="b"/>
						<circle cx="426.7" cy="302" r="3.6" className="b"/>
						<circle cx="430.7" cy="290.9" r="2.6" className="b"/>
						<ellipse cx="444.2" cy="279" className="b" rx="1" ry="2.2" transform="matrix(.87 -.5 .5 .87 -79.99 259.49)"/>
						<ellipse cx="453.3" cy="420.6" className="b" rx="9.2" ry="2.6" transform="rotate(-54.91 453.22 420.6)"/>
						<ellipse cx="437" cy="423.6" className="b" rx="11.3" ry="5.5" transform="rotate(-54.91 436.98 423.53)"/>
						<ellipse cx="541.9" cy="267.4" className="d" rx="53.6" ry="66.7"/>
						<path d="M511 407l-.8-2.4-2.3 1 1-2.3-2.5-1 2.5-.8-1-2.4 2.2 1.3 1-2.5.8 2.5 2.4-1.2-1 2.5 2.4 1-2.5.8 1 2.4-2.3-1-1 2.3" className="d"/>
						<path d="M493 375l-1-2.6-2.3 1.2 1-2.4-2.4-1 2.5-.8-1-2.4 2.3 1 1-2.4 1 2.5 2.3-1-1.2 2.4 2.6 1-2.5.8 1.3 2.4-2.4-1.2-1 2.5" className="d"/>
						<path d="M472 278l-1-2.6-2.3 1.2 1-2.4-2.4-1 2.5-.8-1-2.4 2.3 1 1-2.4 1 2.5 2.3-1-1.2 2.4 2.6 1-2.5.8 1.3 2.4-2.4-1.2-1 2.5" className="d"/>
						<path d="M524.3 364.8l-.5-1.5-1.4.7.6-1.4-1.4-.5 1.4-.4-.6-1.4 1.4.7.5-1.5.5 1.4 1.3-.8-.5 1.4 1.4.5-1.5.6.6 1.4-1.2-.7-.5 1.5" className="d"/>
						<path d="M474.6 248.8l-.5-1.4-1.3.6.7-1.3-1.4-.5 1.4-.5-.7-1.4 1.4.6.6-1.5.5 1.4 1.5-.7-.7 1.4 1.5.5-1.5.5.7 1.3-1.4-.6-.4 1.4" className="d"/>
						<path d="M415.3 218.2l-.5-1.4-1.3.7.6-1.4-1.3-.4 1.4-.5-.5-1.3 1.3.7.5-1.5.5 1.4 1.4-.7-.6 1.4 1.4.6-1.4.5.6 1.5-1.4-.7-.5 1.4" className="d"/>
						<path d="M511 335l-.4-1.5-1.3.6.6-1.2-1.5-.5 1.4-.5-.7-1.4 1.3.6.5-1.4.6 1.4 1.4-.6-.6 1.4 1.4.5-1.4.5.6 1.3-1.4-.5-.5 1.4" className="d"/>
						<path d="M509 428.8l-.7-1.4-1.3.7.6-1.3-1.4-.5 1.4-.5-.6-1.4 1.3.7.6-1.4.4 1.4 1.3-.7-.6 1.4 1.5.5-1.4.5.7 1.4-1.3-.6-.5 1.4" className="d"/>
						<path d="M502.5 388.4l-.7-2-2 1 1-2-2-.7 2-.7-1-2 2 1 .7-2 .7 2 2-1-1 2 2 .7-2 .7 1 2-2-1-.7 2" className="d"/>
						<path d="M511 479.3l-.6-2-2 1 1-2-2-.7 2-.7-1-2 2 1 .7-2 .8 2 2-1-1 2 2 .6-2 .7 1 2-2-1-.7 2" className="d"/>
						<path d="M518.5 387l-.3-.6-.8.3.4-.7-.8-.3.8-.3-.4-.8.8.4.3-.8.2.8.8-.4-.4.8 1 .3-1 .3.5.7-.8-.3-.2.7" className="d"/>
						<path d="M453.3 254l-.3-.7-.8.4.4-.8-.8-.3.8-.3-.4-.8.8.4.3-.8.3.8.7-.4-.3.8.8.3-.8.2.3.7-.7-.4-.3.8" className="d"/>
						<path d="M498.6 400.7l-.3-.8-.8.3.4-.8-1-.3 1-.3-.5-.8.8.4.3-.8.2.8.8-.4-.4.7.8.2-.8.3.4.8-.8-.4-.2.7" className="d"/>
						<path d="M484 215.5l-.3-.8-.8.4.3-.7-.8-.2.8-.2-.4-.8.7.4.3-.8.2.8.8-.4-.4.8.8.3-.8.3.4.8-.8-.3-.2.8" className="d"/>
						<path d="M543.4 420.6l-.3-.8-.6.4.3-.8-.8-.3h.7l-.3-1 .7.4.4-.7.3.7.8-.3-.4 1h1l-1 .4.5.8-.8-.4-.3.8" className="d"/>
						<path d="M493 326l-.3-.8-.8.4.3-.8-.8-.3.8-.3-.4-.7.7.3.3-.8.3.8.7-.3-.3.7.7.3-.7.3.3.8-.7-.4-.3.8" className="d"/>
						<path d="M519.2 413.3l-.2-.5-.5.3.2-.4-.5-.2.5-.2-.2-.5.5.2.2-.6.2.5.5-.3-.4.5.5.2-.4.2.3.5-.6-.2-.2.5" className="d"/>
						<path d="M498 348.2l-.2-.5-.5.2.2-.6-.5-.2.5-.2-.2-.5.5.3.2-.6.2.6.5-.3-.3.5.6.2-.6.2.3.5-.5-.3-.2.5" className="d"/>
						<path d="M398 222.8l-.2-.6-.5.3.3-.6-.6-.2.6-.2-.3-.6.5.3.2-.6.2.6.6-.3-.3.6.6.2h-.5l.3.7-.6-.3-.2.6" className="d"/>
						<path d="M489.4 355l-.2-.6-.6.2.3-.5h-.7l.6-.3-.4-.5.6.2.2-.5.2.4.5-.2-.2.5.6.2h-.6l.3.6-.4-.2-.2.5" className="d"/>
					</g>
				</NavLink>
				<NavLink className="click-through-child" to={`${match.url}/pressinggame`}>
					<g id="pressing-game">
						<path id="pressing-game-border" d="M227.5 202a9.6 9.6 0 0 0 4.3-7.5V71a9.6 9.6 0 0 0-4.3-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0L4.8 63.5A9.6 9.6 0 0 0 .5 71v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z" className="b"/>
						<path d="M17.5 164.5l184 32.4" className="e"/>
						<path d="M121 211.4L97.5 128" className="e"/>
						<path d="M82.2 171l15.3-43" className="e"/>
						<path d="M131 153l-33.5-25" className="e"/>
						<path d="M50 147.6L97.4 128" className="e"/>
						<path d="M70.6 95L50 147.6" className="e"/>
						<path d="M82.2 171L70.6 95" className="e"/>
						<path d="M74.2 74.4l115-12.8" className="e"/>
						<path d="M201.6 197L189.3 61.5" className="e"/>
						<path d="M97.5 128l91.8-66.4" className="e"/>
						<path d="M74.2 74.4L97.5 128" className="e"/>
						<circle cx="17.5" cy="164.5" r="11.9" className="f"/>
						<circle cx="82.2" cy="170.9" r="11.9" className="f"/>
						<circle cx="97.5" cy="127.9" r="12.8" className="d"/>
						<circle cx="74.2" cy="74.4" r="11.9" className="f"/>
						<circle cx="70.6" cy="95" r="11.9" className="f"/>
						<circle cx="131.1" cy="153" r="11.9" className="f"/>
						<circle cx="49.9" cy="147.6" r="12.8" className="d"/>
						<circle cx="121" cy="211.4" r="11.9" className="f"/>
						<circle cx="189.3" cy="61.6" r="11.9" className="f"/>
						<circle cx="201.6" cy="196.9" r="11.9" className="f"/>
					</g>
				</NavLink>
				<NavLink className="click-through-child" to={`${match.url}/musicplayer`}>
					<g id="music-player">
						<path id="music-player-border" d="M703 201.8a9.6 9.6 0 0 0 4.3-7.5V70.8a9.6 9.6 0 0 0-4.3-7.5L596 1.5a9.6 9.6 0 0 0-8.7 0l-107 61.8a9.6 9.6 0 0 0-4.3 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z" className="b"/>
						<circle cx="588.1" cy="134.8" r="75.7" className="b"/>
						<path d="M574.3 117.3H585v38.3h-10.7z" className="d"/>
						<path d="M590.8 117.3h10.8v38.3h-10.8z" className="d"/>
						<path d="M588.4 51.3A83.2 83.2 0 0 1 650.6 79l8.6-8.7a95.4 95.4 0 0 0-71-31.2v12.3z" className="d"/>
						<circle cx="588.1" cy="134.8" r="83.5" className="b"/>
						<circle cx="588.1" cy="134.8" r="95.7" className="b"/>
					</g>
				</NavLink>
				<NavLink className="click-through-child" to={`${match.url}/hmce`}>
					<g id="hcme">
						<path id="hcme-border" d="M465 201.8a9.6 9.6 0 0 0 4.5-7.5V70.8a9.6 9.6 0 0 0-4.4-7.5L358 1.5a9.6 9.6 0 0 0-8.5 0l-107 61.8a9.6 9.6 0 0 0-4.4 7.5v123.5a9.6 9.6 0 0 0 4.5 7.5l107 61.8a9.6 9.6 0 0 0 8.6 0z" className="b"/>
						<g id='hcme-item'>
							<path d="M.5.6H160V160H.4z"/><path d="M41.2 41.2h78v78h-78zM.5 160l40.7-40.7M.5.6l40.7 40.6M160 .6l-40.7 40.6M119.3 119.3L160 160"/>
							<path d="M36 36v89M30 30.2v101M23.5 23.6v113M16.6 16.7V144M7.4 7.5v146M36 125h88.8M30 131h101M23.5 136.5H137M16.6 144h128.6M7.4 153.6H153M124.8 125V36M36 36h88.8M30 30.2h101M23.5 23.6H137M16.6 16.7h127M7.4 7.5H153M131 30.2v100M137 23.6v113M145.2 144V16.7M153 7.5v144.8M48.5 119.3l-33 40.7M55.2 119.3l-14 40.7M66.6 119.3L61 160M111.5 119.3l33 40.7M104.8 119.3l14 40.7M93.4 119.3L99 160M77.3 119.3V160M48.5 40.8L15.5.2M55.2 40.8L41.2.2M66.6 40.8L61 .2M111.5 40.8l33-40.6M104.8 40.8l14-40.6M93.4 40.8L99 .2M77.3 40.8V.2M119.6 112l40.7 33M119.6 105.3l40.7 14M119.6 93.8l40.7 5.7M119.6 49l40.7-33M119.6 55.7l40.7-14M119.6 67l40.7-5.6M119.6 83.2h40.7M41 112L.6 145M41 105.3l-40.5 14M41 93.8L.6 99.5M41 49L.6 16M41 55.7L.6 41.7M41 67L.6 61.5M41 83.2H.6M48.5 40.8v78.5M55.2 40.8v78.5M66.6 40.8v78.5M77.3 40.8v78.5M93.4 40.8v78.5M104.8 40.8v78.5M111.5 40.8v78.5M41 49h78.6M119.6 55.7H41M41 67h78.3M119.6 83.2H41M41 93.8h78.6M119.6 105.3H41M41 112h78.3"/>
							<path d="M15.5.2V160M41.2.2V160M61 .2V160M77.3.2V160M99 .2V160M118.8.2V160M144.5.2V160M.5 16h159.8M.5 41.7H160M.5 61.4H160M.5 83.2h159.8M.5 99.5h159.8M.5 119.3h159.3M.5 145h159.8"/>
						</g>
					</g>
				</NavLink>
			</svg>
		</div>

	)
}

export default class Work extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.onUnSwipeable();
	}

	renderWork(props) {
		return (<WorkContent location={props.location} workId={props.match.params.workId}/>)
	}

	renderSvg(props)
	{
		return (
			<CSSTransitionGroup component='span' transitionAppear={true} transitionAppearTimeout={300} transitionName="slide-up" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div key={location.key} className='row work-page'>
					<SVG {...props}/>

				</div>
			</CSSTransitionGroup>
		)

	}

	render() {

		return (
			<Route render={({location, history, match}) => {
				return (
					<Switch>
						<Route path={`${match.url}/:workId`} component={this.renderWork}/>
						<Route path={match.url} component={this.renderSvg.bind(this)}/>
					</Switch>
				)
			}}/>
		)
	}
}
