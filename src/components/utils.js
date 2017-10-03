export function handleSwipeUp(props, possible) {
	let urls = ['/', '/about', '/work', '/contact'],
		index = urls.indexOf(props.location.pathname),
		next = index + 1;

	if (next > urls.length - 1 || possible == false)
		return;
	props.history.push(urls[next]);
}

export function handleSwipeDown(props, possible) {

	let urls = ['/', '/about', '/work', '/contact'],
		index = urls.indexOf(props.location.pathname),
		previous = index - 1;

	if (previous < 0 || possible == false) {
		return;
	}

	props.history.push(urls[previous]);
}

export function handleSwipeLeft(props) {
	let urls = ['/', '/about', '/work', '/contact'],
		index = urls.indexOf(props.location.pathname),
		next = index + 1;

	if (next > urls.length - 1 || !urls.includes(props.location.pathname))
		return;
	props.history.push(urls[next], {
		transition: 'slideleft'
	});
}

export function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
};

export function handleSwipeRight(props) {
	let urls = ['/', '/about', '/work', '/contact'],
		index = urls.indexOf(props.location.pathname),
		previous = index - 1;



	if (previous < 0 || !urls.includes(props.location.pathname)) {
		return;
	}

	props.history.push(urls[previous], {
		transition: 'slideright'
	});
}

export function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		let context = this,
			args = arguments;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function removeTlAnimation(tl) {
	tl.pause(0);
	tl.kill();
}

export function pad(num, size) {
	let s = num + "";
	while (s.length < size)
		s = "0" + s;
	return s;
}


export function mobileCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export function polarToRectangular(radius, degrees) {
	let theta = degrees * (Math.PI / 180);

	return {
		x: radius * Math.cos(theta),
		y: radius * Math.sin(theta),
		degrees
	}
}

export function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function transpose(matrix) {
	return Object.keys(matrix[0])
		.map(colNumber => matrix.map(rowNumber => rowNumber[colNumber]));
}

export function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export function importTemplates(idArray) {
	let obj = {};

	idArray.forEach((identifier) => {
		let s = select(`#${identifier}`);

		obj[identifier] = s.html();
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

export function randomColor(colors) {
	let originalColor = node.selector.select('#overlay').style('fill');

	return colors[getRandomInt(0, colors.length)];
}



export function endAll(transition, callback) {
	let n = 0;

	if (transition.empty()) {
		callback();
	} else {
		n = transition.size();

		transition.on("end", function () {
			n--;
			if (n === 0) {
				callback();
			}
		});
	}
}
