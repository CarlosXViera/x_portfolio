import React, {PropTypes} from 'react';
import {Route, Switch} from 'react-router-dom';
import WorkContent from 'WorkContent';
import WorkList from 'WorkList';

export default class Work extends React.Component {
	constructor(props) {
		super(props)
	}

	renderWork(props) {
		return (<WorkContent location={props.location} workId={props.match.params.workId}/>)
	}

	renderSVG(props) {
		return (
			<WorkList {...this.props}></WorkList>
		)
	}

	render() {

		return (
			<Switch>
				<Route path={`/work/:workId`} component={this.renderWork.bind(this)}/>
				<Route path={'/work'} component={this.renderSVG.bind(this)}/>
			</Switch>
		)
	}
}
