import React from 'react';
import classNames from 'classnames';

export const WorkItems = (props) => {
	return (
		<div className="col-sm-10 col-sm-offset-1 col-lg-6 col-lg-offset-3 work-content">
			<div className='work-item'>
				<SVG {...props}/>
			</div>
		</div>

	)
}

export const Eye = (props) => {
	return (
		<g clipPath="url(#blink)" {...props} id='eye'>
			<path fill="#7fda89" d="M46.92.34A46.57 46.57 0 1 0 93.48 46.9 46.57 46.57 0 0 0 46.92.35zm0 52.73a6.16 6.16 0 1 1 6.16-6.16 6.16 6.16 0 0 1-6.16 6.2z"/>
			<path fill="#259073" d="M46.92 29.3a17.6 17.6 0 1 0 17.56 17.6 17.6 17.6 0 0 0-17.56-17.6zm0 23.78a6.16 6.16 0 1 1 6.16-6.16 6.16 6.16 0 0 1-6.16 6.15z"/>
			<path fill="#041122" d="M46.92 1.67c-.27 0-.54-.7-.8-.7s-.57-1-.84-1-.48 1.56-.74 1.57-.52.1-.8.1S43.1.2 42.84.2s-.5.64-.76.67-.46.73-.72.77-.72-1.33-1-1.3-.5.46-.76.5-.47.56-.73.6-.54 0-.8.1-.5.3-.75.35-.67-.6-.93-.5-.3 1.4-.5 1.5-.9-1.4-1.2-1.3-.3 1-.6 1.1-.4.5-.7.6-.7-.3-.9-.2-.4.5-.7.5-.6-.1-.9 0-.8-.5-1-.4-.3.8-.5.9-.9-.7-1.2-.6 0 1.4-.2 1.5-.4.4-.7.5l-.7.3c-.3.1-.7-.2-.9 0s-1-.7-1.2-.5l-.7.5-.7.5s-.1.8-.4 1l-.7.5s-.7 0-.9.1-.2.7-.4.9-1-.6-1.2-.4-.2.8-.4.9-.6.1-.8.2-.5.2-.8.4-.6.1-.8.3-.1.7-.4.9-1-.5-1.3-.3.2 1.2 0 1.4 0 .8-.2 1l-.6.5c-.2.2-1.3-.7-1.6-.6s.3 1.1.1 1.3-.6.1-.8.3-.8-.1-1 .1.4 1.2.2 1.4-1.2-.4-1.4-.2.2.9 0 1.1-1.3-.4-1.5-.2.4 1 .2 1.3.1.8 0 1-.5.2-.7.5-.9 0-1.1.2.5 1 .4 1.2-1.7-.5-1.9-.2.4.9.3 1.1-1 0-1.1.3.8 1.1.7 1.3.1.7 0 .9-1.4-.1-1.5.1.8 1 .7 1.2-.7.2-.8.5 0 .6-.1.8-.8.3-.9.5.1.6 0 .8-.3.4-.4.7-.2.5-.3.8.6.8.5 1-.3.5-.3.8 0 .5-.2.8-1.7.2-1.7.4.8.7.8 1 .1.6.1.8.4.6.4.8-1.2.4-1.3.7 0 .5 0 .8-.9.5-.9.7.6.6.5.9.1.6 0 .8.5.6.5.9-.4.5-.4.8.6.6.6.8.1.6.1.8-.1.6-.1.8-.4.6-.4.8-.6.6-.6.8.9.6.9.8-1.6.5-1.6.8.4.6.4.8-.4.6-.4.9 1.2.5 1.2.7-1 .6-1 .8.5.5.5.7 1 .5 1 .7-.6.6-.6.9.7.5.7.8-.3.6-.3.9-.16.5-.1.8.4.5.5.7-.6.7-.6.9.9.4 1 .6-.7.7-.65 1 1.3.3 1.36.5-.7.7-.6 1 1 .3 1.1.6-1.1.9-1 1.1-.3.7-.2 1 .6.4.7.6-.2.7-.1.9 1.1.2 1.2.5-.4.7-.3 1 .5.4.6.6.46.4.6.6-.44.8-.3 1 1.2 0 1.35.2 0 .6.2.83.6.23.8.5.2.5.3.7.5.3.68.5-.8 1.2-.6 1.4.56.3.7.5 0 .64.2.85.18.52.3.8 1-.2 1.2 0 .7.1.9.3-.6 1.2-.4 1.4.2.6.38.8.7.1.9.3 1.2-.4 1.4-.27-.6 1.4-.4 1.6.2.53.4.7 1.6-1 1.8-.8-.4 1.2-.2 1.33 1.1-.5 1.3-.3-.5 1.4-.3 1.6 1-.4 1.2-.2-.1 1.06.1 1.2 1.2-.7 1.4-.53-.2 1.2 0 1.4 1.1-.6 1.3-.44-.4 1.5-.1 1.6.6 0 .8.2.8-.3 1.1-.2.7-.1 1 0 0 1 .2 1.1.1.9.3 1 .8-.27 1-.1.9-.5 1.18-.4-.26 1.6 0 1.7l.7.4c.3.1.8-.3 1-.2s.9-.5 1.1-.4 0 1.2.3 1.3.6 0 .85.1l.8.4s.6 0 .9.1.7-.2.94-.1.6.1.8.2 0 1.5.3 1.6l.8.2s.9-1 1.17-1 0 1.6.3 1.7.9-.9 1.1-.8.5.5.7.6.4.6.7.7.7-.7 1-.6.3 1.1.55 1.1.6-.2.9-.1.5.3.8.3.5.6.8.6.7-.9.96-.8.6-.3.8-.3.4 1.4.7 1.4.6-.3.9-.3.5.3.8.3.6-1.2.8-1.2.5.7.8.7.5.7.8.7.5-.1.8-.1.5-1.3.7-1.3.7 1.2.9 1.2.6-.2.9-.2.4-1.7.6-1.7.6.1.8.1.7.8 1 .7.6 0 .8 0 .4-.7.7-.8.6 0 .8-.1.46-.5.7-.6.7.6 1 .5.77.6 1 .6.4-.7.67-.8.3-.7.6-.8l.8-.3s.3-.8.54-.9.9.7 1.1.6.6 0 .9-.03.1-1.1.38-1.2 1 1 1.3.9.2-.9.4-1 .6 0 .8-.2 0-1.2.3-1.3.7.2.9 0 .4-.4.6-.5.9.5 1.1.4.13-.8.4-1 .3-.4.6-.6 1 .8 1.3.7 0-1 .3-1.1.7.1.9 0l.8-.3s.34-.5.56-.65-.2-1.2 0-1.4 1 .5 1.2.4.7.1 1 0-.5-1.5-.2-1.6 1.2.7 1.4.54 0-.8.2-1 .77 0 1-.1 0-.9.2-1 1 .22 1.18.1-.26-1.1 0-1.3.3-.48.5-.67 1.2.5 1.4.3.25-.5.44-.7-.7-1.3-.5-1.48 1.1.3 1.3.1.2-.6.4-.8-.3-1-.1-1.2l.5-.6s.5-.3.7-.5.7-.1.8-.3.4-.4.5-.7 0-.7.1-.9.2-.5.4-.77.2-.5.3-.7.1-.5.3-.8 1.5.2 1.6 0-.6-.9-.4-1.1 0-.6.1-.8 1.5.1 1.6-.1.24-.5.4-.7-.7-.9-.6-1.1 1.2-.1 1.3-.4-.7-.9-.6-1.1-.2-.7-.1-.9 1.1-.2 1.2-.4-.2-.7-.1-.9.4-.5.47-.7-.3-.7-.2-.9-.3-.6-.2-.9.8-.4.8-.6l.2-.8s-.8-.7-.7-1 1.4-.3 1.4-.6-.9-.7-.9-1-.2-.6-.1-.8-.3-.6-.3-.9.6-.5.6-.8.6-.4.6-.7.76-.5.8-.7-1.5-.6-1.5-.9.2-.5.2-.8.6-.5.6-.7 0-.6.06-.8.8-.6.8-.8-1.2-.6-1.2-.9.1-.58.1-.8 1-.6 1-.88-.8-.5-.8-.8.4-.6.4-.8.4-.6.3-.9-1.6-.4-1.65-.7 1.4-.7 1.4-1-1.4-.4-1.4-.7l-.14-.8s.2-.5.2-.8-.8-.4-.8-.7.1-.6.1-.8-.3-.5-.3-.7.1-.6 0-.8.8-.8.7-1-.8-.4-.9-.6 0-.6-.1-.8.5-.7.4-1 0-.6-.1-.87-.3-.4-.4-.7l-.3-.8c-.1-.3.1-.7 0-.9s-.8-.3-.9-.5-.5-.4-.6-.6-.5-.4-.6-.6 0-.7-.1-.9-.1-.5-.22-.8.6-.9.5-1.15-1.5.1-1.6-.1 1-1.2.8-1.4-1-.1-1.1-.3-.87-.1-1-.3.9-1.2.8-1.5-.8-.2-1-.4-.54-.3-.7-.5l-.4-.7s0-.7-.2-.9-.8-.1-1-.3-.55-.3-.7-.5 0-.6-.2-.9-.7-.1-.9-.3.15-.8 0-1 .1-.8-.1-1-.57-.2-.75-.4-.7-.1-.9-.3-.8 0-.96-.2-.1-.6-.3-.8-.5-.2-.7-.4.4-1.2.2-1.4-.4-.3-.7-.5-.5-.2-.7-.4-.3-.5-.5-.7-.1-.7-.4-.9l-.6-.5s-1.3.8-1.5.64.3-1.3 0-1.4-.7 0-.9-.1-.4-.4-.6-.5-.6 0-.9-.2-.4-.4-.6-.5-.4-.3-.7-.46-.8.4-1 .2 0-1.2-.3-1.3-.6.1-.9 0-.9.6-1.1.5-.4-.2-.7-.3-.4-.5-.6-.6-.3-.7-.5-.73-.4-.6-.7-.64-.6.2-.9.1-.7.6-1 .5-.1-1-.4-1.1-.6.4-.9.4-.33-.9-.6-1l-.8-.3s-.5-.3-.8-.3-.63.6-.9.5-.7.7-.9.6-.5-.3-.8-.4-.4-.7-.7-.8-.5-.4-.8-.4-.5.1-.8.1-.6.5-.84.5-.6.5-.9.5-.5-.6-.8-.6-.5-.4-.8-.4H49s-.54.1-.8.1-.5-.9-.8-.9-.55 1.7-.8 1.7zm0 88.6c-.28 0-.55-.7-.83-.72s-.6-1-.8-1-.7 1.45-.9 1.45h-.9s-.4-1.6-.7-1.6-.6.53-.9.5-.7.6-.9.57-.3-1.47-.6-1.47-.6.3-.9.24-.7.37-.9.32-.5-.17-.8-.23-.6.08-.9 0-.4-.78-.7-.85-.9 1.16-1.2 1.08-.1-1.6-.4-1.68-.8.7-1.1.63-.7.3-.9.2-.4-.6-.6-.7-.7.1-.9 0-.4-.5-.7-.6-.3-.8-.5-1-.8.4-1 .3-.1-1.1-.4-1.2-1.1.9-1.3.8-.6 0-.9-.2l-.7-.4c-.3-.1-.3-.6-.5-.8s0-1.1-.2-1.2-.5-.2-.7-.3-.6-.2-.8-.3-.8.3-1 .1-.5-.2-.8-.4-.2-.6-.4-.8-.8.1-1-.1.2-1.1 0-1.2-.8.1-1-.1-.2-.5-.4-.7-.3-.4-.5-.6-.3-.5-.4-.7-.8 0-1-.2.4-1 .2-1.2-1.2.4-1.4.1-.9 0-1-.2l-.5-.5c-.1-.2.8-1.3.7-1.5s-1.1.1-1.3-.1-.1-.6-.2-.8.2-.8 0-1-1.3.2-1.4 0 .6-1.1.5-1.3-1 0-1.1-.3.7-1.1.6-1.3-1.1.1-1.3-.2-.8-.1-1-.4 0-.6-.2-.8.4-.8.3-1.1-1.2 0-1.3-.2 1.2-1.2 1.1-1.5-1-.1-1.2-.3.5-.9.3-1.1-1.4.1-1.5-.2-.7-.3-.8-.6.9-1 .8-1.2-1.3 0-1.4-.3.3-.7.2-1-.5-.4-.6-.7.4-.7.3-1-.5-.4-.5-.7 0-.5-.1-.8-.1-.5-.2-.8-.9-.3-1-.5 0-.5-.1-.8-.2-.5-.3-.8 1.4-.8 1.4-1.1-1-.3-1.1-.6-.3-.5-.4-.8-.6-.5-.6-.8 1-.7 1-.9-.2-.5-.2-.8.7-.5.7-.8-.7-.5-.7-.8v-.8s-.4-.6-.4-.8.3-.5.4-.8-.6-.6-.6-.9-.1-.6-.1-.8l.2-.8s.4-.5.4-.8.8-.4.8-.7-.8-.7-.7-1 1.8-.1 1.8-.4-.2-.6-.2-.9.6-.4.6-.6-1-.8-.9-1.1 1.1-.2 1.2-.5-.3-.6-.2-.9-.7-.9-.6-1.1.9-.3 1-.5-.4-.8-.3-1 .6-.4.7-.6.4-.4.5-.7-.1-.6 0-.9.9-.1 1-.4-.5-.8-.4-1.1 1-.1 1.1-.3-.8-1-.7-1.3 1 0 1.1-.3-.5-.9-.4-1.2 1.4.2 1.5 0 .7-.2.8-.4-.1-.7 0-.9.6-.3.8-.5-.5-1-.4-1.2.8-.1 1-.3 0-.7.2-.9.1-.6.2-.8.9 0 1-.2-.6-1.1-.4-1.3.6-.2.7-.5 0-.7.1-.9.4-.4.6-.6.2-.6.34-.8 1.3.5 1.5.3.13-.6.3-.8.6-.1.8-.3.6-.2.8-.4-.2-1 0-1.2.1-.7.3-.9 1.2.6 1.5.4.5-.1.8-.2.1-.7.3-.8-.2-1.2 0-1.4 1.25.9 1.5.7.55-.1.8-.2-.45-1.8-.2-1.9 1 .7 1.3.6 0-1.2.2-1.3 1.1 1 1.35.9.1-1 .4-1.2.87.6 1.1.5 0-1.4.3-1.5.9.9 1.2.8.1-1.2.4-1.3 1 1.1 1.27 1 .4-.5.62-.6.3-.8.6-.9.4-.6.7-.7.7.7 1 .6.6.6.9.6.4-.7.6-.8.4-1 .7-1 .8 1.4 1 1.3l.8-.1c.3 0 .5-.7.77-.7s.5-.9.78-.9.6 1 .9 1 .5-.3.8-.3h.8s.7-.4 1-.4.5-.5.8-.5.5-.2.8-.2.57 1.4.8 1.4.6-.1.8-.1.6-1.3.9-1.3.5 1.5.8 1.5.6-1 .9-1 .5.4.8.4.5.5.8.6.6-.8.9-.8.4 1 .7 1 .53-.3.8-.2.5.2.8.2.4.5.7.6.7-.9 1-.8.6-.3.9-.2.2 1.4.5 1.5.6-.3.84-.2.5.3.77.4.86-1.1 1.1-1 .38.8.6.9.3.9.58.9.6.1.8.2 1-1 1.2-.9 0 1.4.3 1.5.6 0 .8.1 1.7-2 1.9-1.9.4.4.6.6.1 1 .36 1.14.44.4.7.5.8-.2 1-.1.4.4.63.6.7 0 .93.1 0 1 .2 1.1 0 .96.2 1.1.7-.1.95.1.8-.1 1 .07l.6.5s.8-.1 1 .1-.2 1.08 0 1.27.2.5.4.7 1.1-.3 1.3-.1-.6 1.3-.4 1.5.9-.1 1.1.1.2.5.4.7 1.1-.3 1.3-.1 0 .7.2.9.5.3.6.6-.3 1-.2 1.2.9 0 1 .2.5.3.7.5-.7 1.1-.54 1.4 1 0 1.1.2-.1.7 0 1l.3.7s.5.4.65.6 1.25-.1 1.4.1-.6 1-.46 1.2-.17.7 0 1 1.54-.2 1.67 0-.9 1.1-.8 1.3.75.2.9.4-.25.7-.1 1 .8.2.9.5-.53.9-.43 1.1 1.1.2 1.2.4.3.5.4.7-.9 1-.8 1.2.37.5.4.7 1.4.1 1.5.4-.7.8-.7 1.1.4.5.5.8 1 .3 1 .5.1.5.2.8-.2.6-.1.8-.34.6-.3.9 0 .6.1.8.5.4.5.7.2.5.2.8.2.5.3.8.2.6.2.8-1.3.6-1.3.9.96.5.97.8.3.5.3.8-1.4.5-1.4.8v.8s.9.6.9.9-1.1.4-1.1.7.9.6.9.9.4.6.4.9-1.1.4-1.1.6.3.6.2.9-.3.5-.3.7.3.6.3.9.3.6.2.9-.8.4-.8.7-.1.5-.2.8.7.7.6 1-1.4.1-1.5.4.8.8.7 1 0 .6 0 .8.2.6.1.9-.7.3-.8.6-.7.3-.8.53-.8.2-1 .4 1.2 1.2 1 1.4-.3.42-.5.7-.7.3-.8.5-.3.5-.4.7-.9.1-1 .4.9 1.1.7 1.3-.4.4-.5.62-1.1-.1-1.3.1.3.8.2 1.1-.7.1-.9.4-.7.1-.9.4.9 1.4.8 1.6-1.5-.6-1.7-.3.7 1.2.5 1.4-.3.4-.5.6-.6.1-.8.3.1.9-.1 1-.5.2-.7.4-.3.5-.5.7-.5.23-.7.4-1-.34-1.3-.17.1.9-.1 1.1-.5.3-.7.46-.8-.2-1 0-.5.2-.7.3-.3.5-.5.6l-.7.4c-.3.2-.7 0-.9.2s-.1.8-.37 1-.26.6-.5.76-.3.6-.5.7-.6 0-.9.2-.5.2-.73.3-1-.6-1.2-.45.2 1.4-.1 1.55-1.14-1-1.4-.9-.1 1-.3 1.1-.2.9-.44 1-1.1-1-1.3-.9-.2.8-.4.9-.4.5-.6.7l-.8.3c-.25.1-.6-.1-.9 0s-.3.8-.5.9-.4.4-.7.5-.6-.2-.9-.1-.3.7-.6.7-.7-.4-1-.3-.63-.4-.9-.4-.43.4-.7.5-.4.6-.7.6-.4.65-.7.7-.6-.2-.9-.1-.5.3-.74.4-.7-1.1-1-1-.5.2-.8.2-.5.2-.7.3-.55-.2-.8-.2-.55-.4-.8-.4-.4 1.5-.65 1.5z" opacity=".07"/>
			<ellipse cx="46.92" cy="42.38" fill="#fff" rx="2.74" ry="1.37"/>
			<path fill="#7fda89" d="M46.3 40.7a2.5 2.5 0 0 1 .4 0c-.07-.27-.27-11.27-.27-11.27zm4.9 10.8a2.5 2.5 0 0 0 .3-.28c.14.22 8.2 7.72 8.2 7.72zm.83-1.02a2.5 2.5 0 0 0 .22-.34c.23.2 9.62 5.86 9.62 5.86zm.84-1.7a2.5 2.5 0 0 0 .1-.4c.25.13 10.95 2.72 10.95 2.72zm.23-1.23a2.5 2.5 0 0 0 0-.4c.25.06 11.25.42 11.25.42zm-.04-1.35a2.5 2.5 0 0 0-.06-.42c.27 0 11.1-1.9 11.1-1.9zm-.5-1.97a2.5 2.5 0 0 0-.18-.37c.26-.06 10-5.14 10-5.14zm-.9-1.3a2.5 2.5 0 0 0-.27-.3c.2-.12 8.1-7.8 8.1-7.8zm-1-.93a2.5 2.5 0 0 0-.32-.24c.2-.18 6.36-9.3 6.36-9.3zm-1.7-.93a2.5 2.5 0 0 0-.4-.13c.14-.23 3.27-10.78 3.27-10.78zM44.93 41a2.5 2.5 0 0 0-.4.1c0-.26-3.48-10.7-3.48-10.7zm-1.3.7a2.5 2.5 0 0 0-.35.18c-.1-.26-5.63-9.77-5.63-9.77zm-1.42 1.22a2.5 2.5 0 0 0-.3.3c-.1-.23-8.2-7.64-8.2-7.64zm-.9 1.43a2.5 2.5 0 0 0-.1.38c-.2-.15-10.5-4-10.5-4zm-.4 1.3a2.5 2.5 0 0 0-.1.4c-.2-.1-11.1-1.73-11.1-1.73zm.2 1.9a2.5 2.5 0 0 0 0 .4c-.2 0-11.1 1.7-11.1 1.7zm.1 1.88a2.5 2.5 0 0 0 .2.38c-.3 0-10.4 4.3-10.4 4.3zm.9 1.3a2.5 2.5 0 0 0 .2.35c-.2.1-9.3 6.3-9.3 6.3zm1.5 1.4a2.5 2.5 0 0 0 .3.28c-.2.2-7 8.9-7 8.9zm1.4.67a2.5 2.5 0 0 0 .4.14c-.1.23-3.3 10.78-3.3 10.78zm1.1.27a2.5 2.5 0 0 0 .4 0c-.1.25-1 11.22-1 11.22zm2.1.03a2.5 2.5 0 0 0 .4-.08c0 .27 2.4 11 2.4 11zm-1.1.07a2.5 2.5 0 0 0 .4 0l.3 11.26zm2.9-.67a2.5 2.5 0 0 0 .4-.2c.1.25 5.7 9.7 5.7 9.7z"/>
		</g>
	)
}

export const SVG = ({
	gsProps,
	dsProps,
	pgProps,
	mpProps,
	hcProps,
	disabledStatus
}) => {

	let workItemClass = classNames({disableAll: disabledStatus});
	return (
		<svg id="work-item-svg" viewBox="0 0 707.8 483.1">
			<defs>
				<clipPath id="a">
					<path d="M588 405.7V272.2l-115.5-66.8-115.7 66.8v133.5l115.7 66.8L588 405.7z" className="a"/>
				</clipPath>
				<clipPath id="blink" transform="translate(-32.52)">
					<path id='blink-path' fill="none" d="M0 .34h160.5v93.14H0z"/>
				</clipPath>
			</defs>
			<g {...gsProps} id='gravesends-eye' className={workItemClass}>
				<path id="gravesends-border" className="click-through-child" d="M346.5 408.2a9.6 9.6 0 0 0 4.3-7.5V277.2a9.6 9.6 0 0 0-4.3-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0l-107 61.7a9.6 9.6 0 0 0-4.3 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z" className="b"/>
				<Eye transform='translate(190,290)'/>
			</g>

			<g {...dsProps} id="deep-space" className={workItemClass}>
				<path id="deep-space-border" d="M583.8 408.2a9.6 9.6 0 0 0 4.3-7.5V277.2a9.6 9.6 0 0 0-4.2-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0l-107 61.7a9.6 9.6 0 0 0-4.2 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5L468 470a9.6 9.6 0 0 0 8.8 0z" className="b"/>
				<circle cx="351.4" cy="354.1" r="128.5" className="b"/>
				<circle cx="401.9" cy="307.6" r="5.8" className="b"/>
				<ellipse cx="407.1" cy="2f91.2" className="b" rx="8.7" ry="10.3" transform="rotate(-54.91 407.06 291.2)"/>
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
				<path className='d star' d="M511 407l-.8-2.4-2.3 1 1-2.3-2.5-1 2.5-.8-1-2.4 2.2 1.3 1-2.5.8 2.5 2.4-1.2-1 2.5 2.4 1-2.5.8 1 2.4-2.3-1-1 2.3"/>
				<path className='d star' d="M493 375l-1-2.6-2.3 1.2 1-2.4-2.4-1 2.5-.8-1-2.4 2.3 1 1-2.4 1 2.5 2.3-1-1.2 2.4 2.6 1-2.5.8 1.3 2.4-2.4-1.2-1 2.5"/>
				<path className='d star' d="M472 278l-1-2.6-2.3 1.2 1-2.4-2.4-1 2.5-.8-1-2.4 2.3 1 1-2.4 1 2.5 2.3-1-1.2 2.4 2.6 1-2.5.8 1.3 2.4-2.4-1.2-1 2.5"/>
				<path className='d star' d="M524.3 364.8l-.5-1.5-1.4.7.6-1.4-1.4-.5 1.4-.4-.6-1.4 1.4.7.5-1.5.5 1.4 1.3-.8-.5 1.4 1.4.5-1.5.6.6 1.4-1.2-.7-.5 1.5"/>
				<path className='d star' d="M474.6 248.8l-.5-1.4-1.3.6.7-1.3-1.4-.5 1.4-.5-.7-1.4 1.4.6.6-1.5.5 1.4 1.5-.7-.7 1.4 1.5.5-1.5.5.7 1.3-1.4-.6-.4 1.4"/>
				<path className='d star' d="M415.3 218.2l-.5-1.4-1.3.7.6-1.4-1.3-.4 1.4-.5-.5-1.3 1.3.7.5-1.5.5 1.4 1.4-.7-.6 1.4 1.4.6-1.4.5.6 1.5-1.4-.7-.5 1.4"/>
				<path className='d star' d="M511 335l-.4-1.5-1.3.6.6-1.2-1.5-.5 1.4-.5-.7-1.4 1.3.6.5-1.4.6 1.4 1.4-.6-.6 1.4 1.4.5-1.4.5.6 1.3-1.4-.5-.5 1.4"/>
				<path className='d star' d="M509 428.8l-.7-1.4-1.3.7.6-1.3-1.4-.5 1.4-.5-.6-1.4 1.3.7.6-1.4.4 1.4 1.3-.7-.6 1.4 1.5.5-1.4.5.7 1.4-1.3-.6-.5 1.4"/>
				<path className='d star' d="M502.5 388.4l-.7-2-2 1 1-2-2-.7 2-.7-1-2 2 1 .7-2 .7 2 2-1-1 2 2 .7-2 .7 1 2-2-1-.7 2"/>
				<path className='d star' d="M511 479.3l-.6-2-2 1 1-2-2-.7 2-.7-1-2 2 1 .7-2 .8 2 2-1-1 2 2 .6-2 .7 1 2-2-1-.7 2"/>
				<path className='d star' d="M518.5 387l-.3-.6-.8.3.4-.7-.8-.3.8-.3-.4-.8.8.4.3-.8.2.8.8-.4-.4.8 1 .3-1 .3.5.7-.8-.3-.2.7"/>
				<path className='d star' d="M453.3 254l-.3-.7-.8.4.4-.8-.8-.3.8-.3-.4-.8.8.4.3-.8.3.8.7-.4-.3.8.8.3-.8.2.3.7-.7-.4-.3.8"/>
				<path className='d star' d="M498.6 400.7l-.3-.8-.8.3.4-.8-1-.3 1-.3-.5-.8.8.4.3-.8.2.8.8-.4-.4.7.8.2-.8.3.4.8-.8-.4-.2.7"/>
				<path className='d star' d="M484 215.5l-.3-.8-.8.4.3-.7-.8-.2.8-.2-.4-.8.7.4.3-.8.2.8.8-.4-.4.8.8.3-.8.3.4.8-.8-.3-.2.8"/>
				<path className='d star' d="M543.4 420.6l-.3-.8-.6.4.3-.8-.8-.3h.7l-.3-1 .7.4.4-.7.3.7.8-.3-.4 1h1l-1 .4.5.8-.8-.4-.3.8"/>
				<path className='d star' d="M493 326l-.3-.8-.8.4.3-.8-.8-.3.8-.3-.4-.7.7.3.3-.8.3.8.7-.3-.3.7.7.3-.7.3.3.8-.7-.4-.3.8"/>
				<path className='d star' d="M519.2 413.3l-.2-.5-.5.3.2-.4-.5-.2.5-.2-.2-.5.5.2.2-.6.2.5.5-.3-.4.5.5.2-.4.2.3.5-.6-.2-.2.5"/>
				<path className='d star' d="M498 348.2l-.2-.5-.5.2.2-.6-.5-.2.5-.2-.2-.5.5.3.2-.6.2.6.5-.3-.3.5.6.2-.6.2.3.5-.5-.3-.2.5"/>
				<path className='d star' d="M398 222.8l-.2-.6-.5.3.3-.6-.6-.2.6-.2-.3-.6.5.3.2-.6.2.6.6-.3-.3.6.6.2h-.5l.3.7-.6-.3-.2.6"/>
				<path className='d star' d="M489.4 355l-.2-.6-.6.2.3-.5h-.7l.6-.3-.4-.5.6.2.2-.5.2.4.5-.2-.2.5.6.2h-.6l.3.6-.4-.2-.2.5"/>
			</g>
			<g {...pgProps} id="pressing-game" className={workItemClass}>
				<path id="pressing-game-border" d="M227.5 202a9.6 9.6 0 0 0 4.3-7.5V71a9.6 9.6 0 0 0-4.3-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0L4.8 63.5A9.6 9.6 0 0 0 .5 71v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z" className="b"/>
				<path d="M17.5 164.5l184 32.4" className="e link"/>
				<path d="M121 211.4L97.5 128" className="e link"/>
				<path d="M82.2 171l15.3-43" className="e link"/>
				<path d="M131 153l-33.5-25" className="e link"/>
				<path d="M50 147.6L97.4 128" className="e link"/>
				<path d="M70.6 95L50 147.6" className="e link"/>
				<path d="M82.2 171L70.6 95" className="e link"/>
				<path d="M74.2 74.4l115-12.8" className="e link"/>
				<path d="M201.6 197L189.3 61.5" className="e link"/>
				<path d="M97.5 128l91.8-66.4" className="e link"/>
				<path d="M74.2 74.4L97.5 128" className="e link"/>
				<circle cx="17.5" cy="164.5" r="11.9" className="f node"/>
				<circle cx="82.2" cy="170.9" r="11.9" className="f node"/>
				<circle cx="97.5" cy="127.9" r="12.8" className="f node"/>
				<circle cx="74.2" cy="74.4" r="11.9" className="f node"/>
				<circle cx="70.6" cy="95" r="11.9" className="f node"/>
				<circle cx="131.1" cy="153" r="11.9" className="f node"/>
				<circle cx="49.9" cy="147.6" r="12.8" className="f node"/>
				<circle cx="121" cy="211.4" r="11.9" className="f node"/>
				<circle cx="189.3" cy="61.6" r="11.9" className="f node"/>
				<circle cx="201.6" cy="196.9" r="11.9" className="f node"/>
			</g>
			<g {...mpProps} className={workItemClass}>
				<path id="music-player-border" d="M703 201.8a9.6 9.6 0 0 0 4.3-7.5V70.8a9.6 9.6 0 0 0-4.3-7.5L596 1.5a9.6 9.6 0 0 0-8.7 0l-107 61.8a9.6 9.6 0 0 0-4.3 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z" className="b"/>
				<g id="music-player">
					<circle id='music-player-inner' cx="588.1" cy="134.8" r="75.7" className="b"/>
					<g id="pause-button">
						<path d="M574.3 117.3H585v38.3h-10.7z" className="d"/>
						<path d="M590.8 117.3h10.8v38.3h-10.8z" className="d"/>
					</g>
					<g transform='translate(573.1, 112.8)' id="play-button">
						<polygon points="39.72 22.93 19.86 34.4 0 45.87 0 22.93 0 0 19.86 11.47 39.72 22.93" fill="#7fda89"/>
					</g>
					<circle cx="588.1" cy="134.8" r="83.5" className="b"/>
					<circle cx="588.1" cy="134.8" r="95.7" className="b"/>
					<circle id='play-head' cx="588.1" cy="134.7" r="89.6" fill="none"/>
				</g>
			</g>
			<g id="hcme" {...hcProps} className={workItemClass}>
				<path id="hcme-border" d="M465 201.8a9.6 9.6 0 0 0 4.5-7.5V70.8a9.6 9.6 0 0 0-4.4-7.5L358 1.5a9.6 9.6 0 0 0-8.5 0l-107 61.8a9.6 9.6 0 0 0-4.4 7.5v123.5a9.6 9.6 0 0 0 4.5 7.5l107 61.8a9.6 9.6 0 0 0 8.6 0z" className="b"/>
				<g id='hcme-path'>
					<g id='hcme-item'>
						<path d="M.5.6H160V160H.4z"/>
						<path d="M41.2 41.2h78v78h-78zM.5 160l40.7-40.7M.5.6l40.7 40.6M160 .6l-40.7 40.6M119.3 119.3L160 160"/>
						<path d="M36 36v89M30 30.2v101M23.5 23.6v113M16.6 16.7V144M7.4 7.5v146M36 125h88.8M30 131h101M23.5 136.5H137M16.6 144h128.6M7.4 153.6H153M124.8 125V36M36 36h88.8M30 30.2h101M23.5 23.6H137M16.6 16.7h127M7.4 7.5H153M131 30.2v100M137 23.6v113M145.2 144V16.7M153 7.5v144.8M48.5 119.3l-33 40.7M55.2 119.3l-14 40.7M66.6 119.3L61 160M111.5 119.3l33 40.7M104.8 119.3l14 40.7M93.4 119.3L99 160M77.3 119.3V160M48.5 40.8L15.5.2M55.2 40.8L41.2.2M66.6 40.8L61 .2M111.5 40.8l33-40.6M104.8 40.8l14-40.6M93.4 40.8L99 .2M77.3 40.8V.2M119.6 112l40.7 33M119.6 105.3l40.7 14M119.6 93.8l40.7 5.7M119.6 49l40.7-33M119.6 55.7l40.7-14M119.6 67l40.7-5.6M119.6 83.2h40.7M41 112L.6 145M41 105.3l-40.5 14M41 93.8L.6 99.5M41 49L.6 16M41 55.7L.6 41.7M41 67L.6 61.5M41 83.2H.6M48.5 40.8v78.5M55.2 40.8v78.5M66.6 40.8v78.5M77.3 40.8v78.5M93.4 40.8v78.5M104.8 40.8v78.5M111.5 40.8v78.5M41 49h78.6M119.6 55.7H41M41 67h78.3M119.6 83.2H41M41 93.8h78.6M119.6 105.3H41M41 112h78.3"/>
						<path d="M15.5.2V160M41.2.2V160M61 .2V160M77.3.2V160M99 .2V160M118.8.2V160M144.5.2V160M.5 16h159.8M.5 41.7H160M.5 61.4H160M.5 83.2h159.8M.5 99.5h159.8M.5 119.3h159.3M.5 145h159.8"/>
					</g>
				</g>
			</g>
		</svg>
	)
}
