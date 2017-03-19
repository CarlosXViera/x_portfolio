import React from 'react'
import Nav from 'Nav'

export const Main = (props) => {
	return(
		<div>
			<Nav/>
			<div>
				{props.children}
			</div>
		</div>
	)
}
