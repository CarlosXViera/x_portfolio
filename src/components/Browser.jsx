import React, {PropTypes} from 'react';
import {select, selection} from 'd3-selection';
import FrontEndVisual from 'FrontEndVisual';
import BackEndVisual from 'BackEndVisual';
import DevOpsVisual from 'DevOpsVisual';

export default class Browser extends React.Component {
	constructor(props) {
		super(props)

	}

	componentWillReceiveProps(nextProps) {}

	renderVisualization(vis) {
		switch (vis) {
			case 'front-end':
				return (<FrontEndVisual/>);
				break;
			case 'back-end':
				return (<BackEndVisual/>);
				break;
			case 'dev-ops':
				return (<DevOpsVisual/>);
				break;
			default:
				return (
					<g id="default-vis">
						<text fill="white" transform="translate(200, 200)">Default Visualisation</text>
					</g>
				);
		}

	}

	render() {
		return (
			<div className="row browser">
				<div className="col-sm browser-content">
					<svg id="browser-item-svg" viewBox="0 0 604.8 403.7">
						<path d="M602.2.5H2.6A2 2 0 0 0 .6 2V46a2 2 0 0 1 2-1.6h599.6a2 2 0 0 1 2 1.6V2a2 2 0 0 0-2-1.5z" className="a"/>
						<path d="M175.3 44c-1.6 0-2.2-1-1.2-2.4l16-22.8a6.6 6.6 0 0 1 5-2.5h55a6.2 6.2 0 0 1 4.7 2.6L269 41.4c1 1.4.3 2.6-1.3 2.6z" className="b"/>
						<path d="M.5 44h603.8v359.2H.5z" className="a"/>
						<path d="M90.2 44.3c-1.7 0-2.2-1-1.3-2.5L105 19a6.6 6.6 0 0 1 4.8-2.5h55a6.2 6.2 0 0 1 4.7 2.6L184 41.8c.8 1.4.2 2.6-1.5 2.6z" className="a"/>
						<rect width="7.5" height="328.4" x="592" y="58.4" className="a" rx="2" ry="2"/>
						<circle cx="18.5" cy="24.1" r="6" className="a"/>
						<circle cx="37.6" cy="24.4" r="6" className="a"/>
						<circle cx="55.6" cy="24.2" r="6" className="a"/>
						<path d="M20.4 27H20l-1.5-2-1.3 2h-.6l1.7-2.4-1.7-2.4h.5l1.5 2 1.4-2h.4l-1.6 2.4c.8 1 1.6 2.5 1.6 2.5z" className="a"/>
						<path d="M35 24h2.4v-2.4h.5V24h2.4v.6H38v2.6h-.6v-2.6h-2.5z" className="a"/> {this.renderVisualization(this.props.vis)}
					</svg>
				</div>
			</div>
		)
	}

}
