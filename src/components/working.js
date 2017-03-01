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
