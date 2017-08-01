import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';

export function Transition({children, settings}) {
	return (
		<CSSTransitionGroup transitionAppear={true} transitionAppearTimeout={settings.time} transitionName={settings.transition} transitionEnterTimeout={settings.time} transitionLeaveTimeout={settings.time}>
			{children}
		</CSSTransitionGroup>

	)
}
