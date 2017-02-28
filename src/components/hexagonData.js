let hexagonData = [
  {x1: 0, y1: -33, x2: -30, y2: -15, x3: 0, y3: 0, x4: -3, y4: -30},
  {x1: 0, y1: -15, x2: 0, y2: -33, x3: 0, y3: 0, x4: 30, y4: -15},
  {x1: -30, y1: -15, x2: -33, y2:15, x3: 0, y3: 0, x4: -30, y4: -15},
  {x1: 0, y1: 0, x2: 0, y2: 15, x3: 30, y3:-15, x4: 0, y4: 0},
  {x1: 0, y1: 33, x2: 30, y2: 15, x3: 0, y3: 0, x4: 0, y4: 33},
  {x1: -30, y1: 15, x2: 0, y2: 33, x3: 0, y3: 0, x4: -30, y4: 15}
];

let generateData = function (offset)
{
  let actualHexData = [];
  for(let i = 0; i < 19; i++){
    let xSpacing = i * 80;
    let ySpacing = i * 133;

    for(let j = 0; j < 19; j++){
      actualHexData.push(hexagonData.map((hexDatum) => {

          return {x1: hexDatum.x1 + xSpacing, y1: hexDatum.y1 + ySpacing,
            x2: hexDatum.x2 + xSpacing, y2: hexDatum.y2 + ySpacing,
            x3: hexDatum.x3 + xSpacing, y3: hexDatum.y3 + ySpacing,
            x4: hexDatum.x4 + xSpacing, y4: hexDatum.y4 + ySpacing}
        }));
    }
  }
  return actualHexData;

}
console.log(generateData()[0])
