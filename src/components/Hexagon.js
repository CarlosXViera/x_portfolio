export default class Hexagon {
    constructor() {
        this.hexagonAttr = [
            "30 0 0 18 30 33 30 0",
            "60 18 30 0 30 33 60 18",
            "0 18 0 48 30 33 0 18",
            "30 33 60 48 60 18 30 33",
            "30 66 60 48 30 33 30 66",
            "0 48 30 66 30 33 0 48"
        ];
        this.svg_attrs = {
            // Using a 16:9 ratio for a canvas ensures the entire surface is visible on all mobile devices.
            "viewBox": "0 0 " + 1440 + " " + 2560,
            "preserveAspectRatio": "xMinYMin meet",
        };

        this.create();
    }
    duplicate(sel, i) {

        for (let j = 0; j < i; j++) {
            let content = d3.select(`#${sel.attr('id')}`).html();

            let newSel = d3.select('svg')
                .append('g')
                .html(content)
                .attr('transform', `translate(${j * 100})`)
                .on('click', () => {
                    console.log(this);
                });
        }

    }

    create() {
        let svg = d3.select('body')
            .append('svg')
            .attrs(this.svg_attrs);

        let hexagon = svg.append('g')
            .attr('id', 'hexagon')
            .on('click', () => {
                console.log('clicked');
            });

        hexagon.selectAll('polygon')
            .data(this.hexagonAttr)
            .enter()
            .append('polygon')
            .style('stroke', 'black')
            .style('stroke-width', .3)
            .attr("points", (d) => {
                return d;
            });

        this.duplicate(hexagon, 5);
    }

}
