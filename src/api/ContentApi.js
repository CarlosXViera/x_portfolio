/* access database */
const pageDefaults = {
	hmce: {
		title: 'HMCE',
		images: [
      'hmce-1', 'hmce-2', 'hmce-3'
    ],
		description: 'Hand Controlled-Motion-Experience. Using Max/MSP, OpenGL, and sensor data collected from a LeapMotion. I created a 3 Dimensional hologram that could be interacted with. The idea was to create something that people could manipulate in 3D space. The User is able to bend/scrunch as well as spin the box with specific hand gestures.'
	},
	pressinggame: {
		title: 'Pressing Game',
		images: ['pressing-game-1', 'pressing-game-2', 'pressing-game-3', 'pressing-game-4', 'pressing-game-5'],
		description: 'Co-developed a graphical user interface that computes the shortest evolutionary distance between two species’ genetic code. Wrote the client-side in JavaScript using the D3 data visualization library and built the server-side on NodeJS. Additionally, structured the automated test suite using the Mocha and Selenium testing frameworks, in addition to the Expect assertion library. Grant was provided by Santander Bank.'
	},
	deepspace: {
		title: 'Deep Space',
		images: ['deep-space-1', 'deep-space-2', 'deep-space-3'],
		description: 'This was a project proposed for a mobile development course. The requirements were the A. the use of sensors, B. Sensors must produce an action, C. We must use fragments(Think of partials in JS) and finally, D. We must connect to an external service. Deep Space was one of the very few projects selected to promote the class. The game was written in Java.'
	},
	gravesendseye: {
		title: `Gravesends Eye`,
		images: ['gravesendseye-1', 'gravesendseye-2'],
		description: 'Developed a secondary display that sits on top of an existing surviallance system. Instead of capturing security footage, this system streamlines the capturing of specific ‘moments of importance’. It is similar to the system that Amusement Parks use to capture video footage of funny moments. Built on Max MSP'
	},
	musicplayer: {
		title: 'Music Player',
		images: ['music-player-1'],
		description: 'A web-based music player to interface with an individulas soundcloud user’s sound library. The player is coded from scratch in HTML5 and JavaScript, and expressed in SVG to facilate responsive design.'
	}
}

const ContentApi = {

	getImages: (title) => {
		return pageDefaults[title].images;
	},
	getDescription: (title) => {
		return pageDefaults[title].description;
	},
	getTitle: (title) => {
		return pageDefaults[title].title;
	},
	getEverything: (title) => {
		return pageDefaults[title];
	}
}


export default ContentApi;
