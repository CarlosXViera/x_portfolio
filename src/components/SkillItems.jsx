import React, {PropTypes} from 'react';
import {importAll} from 'utils';
import {mapKeys, mapValues, pickBy} from 'lodash';
import {CSSTransitionGroup} from 'react-transition-group';
import uuid from 'node-uuid';

export default class SkillItems extends React.Component {
	constructor(props) {
		super(props);

	}
	getImagesWithTags(tag) {
		let imgs = mapKeys(importAll(require.context('../assets/skillsImgs', false, /\.(png|jpe?g|svg)$/)), (v, k) => k.split('.')[0]);

		let categories = {
			devOps: [
				'vagrant', 'docker', 'aws', 'linux'
			],
			frontEnd: [
				'css',
				'vue',
				'react',
				'jquery',
				'git',
				'd3',
				'bootstrap',
				'sass',
				'webpack'
			],
			backEnd: [
				'aws',
				'heroku',
				'jasmine',
				'karma',
				'selenium',
				'python',
				'postgresql',
				'nodejs',
				'mysql',
				'mongodb',
				'mocha'
			]
		}

		return mapValues(imgs, (v, k) => {
			let tags = []
			for (let c of Object.keys(categories)) {
				categories[c].includes(k) && tags.push(c);
			}
			return {dataURL: v, tags}
		})
	}
	renderList(category) {

		let filteredSkills = pickBy(this.getImagesWithTags(), (v, k) => v.tags.includes(category));

		return Object.keys(filteredSkills).map((d, i) => {
			return (

				<div key={d} className='skill' style={{
					transitionDelay: `${ (i + 1) * .10}s`
				}}>
					<img src={filteredSkills[d].dataURL}/>
				</div>
			)
		});

	}
	render() {
		return (

			<CSSTransitionGroup transitionName={'bounce-skill'} className='col-sm skill-items' transitionAppear={true} transitionAppearTimeout={2000} component='div' transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>
				{this.renderList(this.props.category)}
			</CSSTransitionGroup>

		);
	}
}
SkillItems.propTypes = {};
