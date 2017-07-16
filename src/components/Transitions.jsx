import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';

export function Transition({children, settings}) {
	return (
		<CSSTransitionGroup className="click-through-child" component='span' transitionAppear={true} transitionAppearTimeout={settings.time} transitionName={settings.transition} transitionEnterTimeout={settings.time} transitionLeaveTimeout={settings.time}>
			{children}
		</CSSTransitionGroup>

	)
}
