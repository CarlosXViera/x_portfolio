export default class Glasses {
	constructor(svgContainer, xCoord, yCoord) {

		this.glasses = svgContainer.append('g')
			.attrs({
				id: 'glasses',
				transform: `translate(${xCoord}, ${yCoord})`
			});

		this.glasses.html(this.ripHtml());
		this.float(this.glasses, xCoord, yCoord - 50, false, this.showUpDown);

	}

	ripHtml() {
		let template = d3.select('.template');
		let html = template.html()
		template.remove();
		return html;
	}

	showUpDown(sel, numX, numY) {
		//have to keep translated x value constant
		return sel.transition()
			.attr('transform', `translate(${numX}, ${numY})`)
			.duration(1500)
			.ease(d3.easeSinOut);
	}

	float(sel, xCoord, yCoord, toggling, callback) {
		let self = this;
		if (toggling) {
			callback(sel, xCoord, yCoord).on('end',
				() => self.float(sel, xCoord, yCoord, !toggling, callback));
		} else {
			callback(sel,xCoord,(yCoord - 50)).on('end',
				() => self.float(sel, xCoord, yCoord, !toggling, callback))
		}
	}

}
