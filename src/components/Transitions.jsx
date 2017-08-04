import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';

export function Transition({children, settings}) {
	return (
		<CSSTransitionGroup transitionName={settings.transition} transitionEnterTimeout={settings.enter} transitionLeaveTimeout={settings.leave}>
			{children}
		</CSSTransitionGroup>

	)
}
