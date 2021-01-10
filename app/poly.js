
import { PI, sin, cos } from './math.js';
import * as PIXI from "./pixi.js";
import hilite from './hilite.js';

export class Poly extends PIXI.Graphics {

  constructor( pts ) {
    
    super();
    // draw poly
    const g = this;

    // drawing style
    const cline = 0x000000;
    const cfill = 0xffffff;
    const alpha = 0.5 // somewhat transparent
    const offset = 1; // inset lines

    g.lineStyle(2, cline, alpha, offset);
    g.beginFill(cfill, alpha);
    g.drawPolygon( pts );
    g.closePath();
    g.endFill();

    // make this interactive
    g.buttonMode = true;

    // hilite when hovering
    hilite(g);

  }
 
}

export class RegularPoly extends Poly {
  constructor(sides = 8, radius = 100, angle = 0, rotation = 0) {
    super( polyPoints(0, 0, sides, radius, angle, rotation) );
  }
}

// calculate corner-points of a polygon
export function polyPoints(x = 0, y = 0, sides = 8, radius = 100, angle = 0, rotation = 0) {

  // range function
  let range = (n) => [...Array(n).keys()];

  // rotation offset
  let rot = rotation + PI * angle / 180;

  // create polygon points on a circle
  const pts = range(sides).map( i => { 
      const a = 2 * PI  * i / sides + rot;
      return { x: x + radius * sin( a ), y: y + radius * cos( a ) }
  });

  return pts;

}