export default class Glasses {
	constructor(svgContainer, xCoord, yCoord) {

    this.glasses = svgContainer.append('g')
			.attrs({
        id: 'glasses',
        transform: `translate(${xCoord}, ${yCoord})`
      });

      this.ripHtml();
      this.float(this.glasses, yCoord - 50, false, this.showUpDown);

	}

  ripHtml(){
    let template = d3.select('#template');

    this.glasses.html(template.html());
    template.remove();
  }

  showUpDown(sel, num){
	  //have to keep translated x value constant
	  return sel.transition()
	    .attr('transform', `translate(185, ${num})`)
	    .duration(1500)
	    .ease(d3.easeSinOut);
	}

  float(sel, yCoord, toggling, callback) {
		let self = this;
	  if (toggling) {
	    callback(sel, yCoord).on('end',
			() => self.float(sel, yCoord, !toggling, callback));
	  } else {
		  callback(sel, (yCoord - 50)).on('end',
			() => self.float(sel, yCoord, !toggling, callback))
		}
	}

}
