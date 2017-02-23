export default class Hexagon {
    constructor() {
        this.hexagonAttr = [
            "0 -33 -30 -12 0 0 0 -33",
            "30 -12 0 -33 0 0 30 -12",
            "-30 -12 -30 15 0 0 -30 -12",
            "0 0 30 15 30 -12 0 0",
            "0 33 30 15 0 0 0 33",
            "-30 15 0 33 0 0 -30 15"
        ];

        this.svg_attrs = {
            // Using a 16:9 ratio for a canvas ensures the entire surface is visible on all mobile devices.
            "viewBox": "0 0 " + 1440 + " " + 2560,
            "preserveAspectRatio": "xMinYMin meet",
        };

        this.hexPositions = this.generatePositions('normal');
        this.hexPositions2 = this.generatePositions();

        this.create();
    }
    duplicate(sel, data, remove) {
        let content = d3.select(`#${sel.attr('id')}`).html();

        data.forEach((d) => {
            let newSel = d3.select('svg')
                .append('g')
                .html(content)
                .attr('class', 'hexagon')
                .attr('transform', `translate${d}`)
                .on('click', this.pop)
                .on('mouseover', this.pop);
        })

        if (remove) {
            sel.remove();
        }

    }

    generatePositions(choice) {
        let collection = [];
        if (choice === 'normal') {
            console.log('in normal');

            for (var i = 1; i < 19; i++) {
                var x = -30;
                var y = -33;

                var newX = (i * 80) + x;
                collection.push('(' + newX + ',' + y + ')');

                for (var j = 1; j < 20; j++) {
                    var newY = (133 * j) + y;
                    collection.push('(' + newX + ',' + newY + ')');
                }

            }
            return collection;
        } else {
            console.log('in other')
            for (var i = 0; i < 20; i++) {
                var x = 10;
                var y = 30;

                var newX = (i * 80) + x;
                collection.push('(' + newX + ',' + y + ')');

                for (var j = 1; j < 20; j++) {
                    var newY = (133 * j) + y;
                    collection.push('(' + newX + ',' + newY + ')');
                }

            }
            return collection;
        }

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

    create() {
        let svg = d3.select('body')
            .append('svg')
            .attrs(this.svg_attrs);

        let hexagon = svg.append('g')
            .attr('id', 'hexagon');

        hexagon.selectAll('polygon')
            .data(this.hexagonAttr)
            .enter()
            .append('polygon')
            .attrs({
                id: (d, i) => `triangle-${i + 1}`,
                points: (d, i) => d
            });

        this.duplicate(hexagon, this.hexPositions);
        this.duplicate(hexagon, this.hexPositions2, 'remove');
    }

}
