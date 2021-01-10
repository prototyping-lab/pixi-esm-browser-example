import * as PIXI from "./pixi.js";
import * as Honeycomb from "./honeycomb.min.js";

export default class HexGrid extends PIXI.Graphics {

  constructor(size = 50, width = 14, height = 11) {

    super();
    const g = this;
    g.lineStyle(5, 0x999999);

    const Hex = Honeycomb.extendHex({ size });
    const Grid = Honeycomb.defineGrid(Hex);

    Grid.rectangle({ width, height }).forEach((hex) => {
      const point = hex.toPoint();
      // add the hex's position to each of its corner points
      const corners = hex.corners().map((corner) => corner.add(point));
      // separate the first from the other corners
      const [firstCorner, ...otherCorners] = corners;
      // move the "pen" to the first corner
      g.moveTo(firstCorner.x, firstCorner.y);
      // draw lines to the other corners
      otherCorners.forEach(({ x, y }) => g.lineTo(x, y));
      // finish at the first corner
      g.lineTo(firstCorner.x, firstCorner.y);
    });
  }
}
