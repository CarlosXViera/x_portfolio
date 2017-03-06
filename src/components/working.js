duplicate(sel, data, remove) {
  let content = d3.select(`#${sel.attr('id')}`).html();

  data.forEach((d, i) => {
    let newSel = d3.select('svg')
      .append('g')
      .html(content)
      .attr('class', 'hexagon')
      .attr('id', `hexagon-${i}`)
      .attr('transform', `translate${d}`)
      .on('click', this.pop);
  })
  sel.remove();

}

pop() {
  let popLocation = [
    "-15, -15",
    "15, -15",
    "-15, 0",
    "15, 0",
    "15, 15",
    "-15, 15"
  ]

  for (var j = 0; j < this.children.length; j++) {
    d3.select(this.children[j]).transition()
      .attr('transform', `translate(${popLocation[j]})`)
      .transition()
      .attr('transform', 'translate(0,0)')
      .duration(600);
  }

}

.on('mousemove', function () {
  let mPos = d3.mouse(this);
  self.gravitate(self, mPos);
})

intersectHex(m, rect, offset) {
  return (
    (m[0] < rect.left && m[0] > rect.left - offset) ||
    (m[1] > rect.bottom && m[1] < rect.bottom + offset) ||
    (m[0] > rect.right && m[0] < rect.right + offset) ||
    (m[1] < rect.top && m[1] > rect.top - offset)
  )
}

followCursor(box, direction, mouse) {

  switch (direction) {
  case 'towards':
    d3.select(box)
      .transition()
      .attr('transform', `translate(${mouse[0]},${mouse[1]})`)
      .duration(5000);
    break;
  case 'reverse':
    d3.select(box)
      .transition()
      .attr('transform', `translate(0,0)`)
      .duration(300);
  }

  return;
}

if (mPos[0] < bBox.x) {
  sel.attr('transform', 'translate(10)').duration(1000);
  console.log('right!')
  return;
}
if (mPos[0] > bBox.x) {
  sel.attr('transform', 'translate(10)').duration(1000);
  console.log('left!')
  return;
}
if (mPos[1] > bBox.y) {
  sel.attr('transform', 'translate(0, 10)').duration(1000);
  console.log('down')
  return;
}
if (mPos[1] < bBox.y) {
  sel.attr('transform', 'translate(0, -10)').duration(1000);
  return;
}
//updown

showUpDown(sel, num){
  //have to keep translated x value constant
  sel.transition()
    .attr('transform', `translate(185, ${num})`)
    .duration(1500)
    .ease(d3.easeSinOut);
}

float(sel, yCoord, toggling) {
  if (toggling) {
    toggling = !toggling; // becomes false
    this.showUpDown(sel,yCoord); //animates down
    this.float(sel, yCoord, toggling);//Passes the current coordinate
  } else {
    toggling = !toggling;//becomes true;
    this.showUpdown(sel, (yCoord - 50));
    this.float(sel, yCoord, toggling);
  }


}




float(yCoord, direction) {
  //remove duplication
  let glasses = d3.select('#glasses');
  let up = 'up';
  console.log(direction);

  if (direction && yCoord) {
    glasses.transition()
      .attr('transform', `translate(185,${yCoord})`)
      .duration(1500)
      .ease(d3.easeSinOut)
      .on('end', () => {
        this.float(yCoord);
      });

      console.log(yCoord);
  } else {
    this.float(yCoord, up);


    // glasses.transition()
    // 	.attr('transform', 'translate(185,)')
    // 	.duration(1500).ease(d3.easeSinOut)
    // 	.on('end', () => {
    // 		this.float(up);
    // 	})
  }
