export function polarToRectangular(radius, degrees) {
	let theta = degrees * (Math.PI / 180);

	return {
		x: radius * Math.cos(theta),
		y: radius * Math.sin(theta),
		degrees
	}
}

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export function importTemplates(idArray) {
	let obj = {};

	idArray.forEach((identifier) => {
		let selection = d3.select(`#${identifier}`);

		obj[identifier] = selection.html();
		selection.remove();
	});

	return obj;
}

export function addPressEventListener(d, that, callback) {
	let mc = new Hammer(that);
	mc.on('press', () => {
		callback(d, that)
	})
}
export function addSwipeEventListener(d, that, callback) {
	let mc = new Hammer(that);
	mc.on('swipe', () => {
		callback(d, that)
	})
}

export function addDblTapEventListener(d, that, callback) {
	let mc = new Hammer(that);
	mc.on('doubletap', () => {
		callback(d, that)
	})
}
