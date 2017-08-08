import React, {PropTypes} from 'react';
import {importAll} from 'utils';
import {mapKeys, mapValues, pickBy} from 'lodash';
import {CSSTransitionGroup} from 'react-transition-group';

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
				'webpack',
				'javascript'
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

	getConstrainedSkills() {}
	renderList(category) {
		console.log(this.getImagesWithTags());

		let filteredSkills = pickBy(this.getImagesWithTags(), (v, k) => v.tags.includes(category));

		let spacing = 19.4,
			topValue = 0 + .5,
			leftValue = -spacing + .5;

		return Object.keys(filteredSkills).map((d, i) => {
			leftValue += spacing;
			if (leftValue >= 90) {
				topValue += spacing + 13.5;
				leftValue = .5;
			}
			let transitionDelay = `${i * .05}s`,
				left = `${leftValue}%`,
				top = `${topValue}%`;

			return (
				<div key={d} className='skill' style={{
					transitionDelay,
					left,
					top
				}}>
					<img src={filteredSkills[d].dataURL}/>
				</div>
			)
		});

	}
	render() {
		return (
			<CSSTransitionGroup className='col-sm skill-items' transitionName={'bounce-skill'} component='div' transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
				{this.renderList(this.props.category)}
			</CSSTransitionGroup>
		);
	}
}
SkillItems.propTypes = {};
