
import { PI, sin, cos } from './math.js';
import * as PIXI from "./pixi.js";
import hilite from './hilite.js';

export default class Poly extends PIXI.Graphics {

  constructor(sides = 8, radius = 100, angle = 0, rotation = 0) {

    super();

    // range function
    let range = (n) => [...Array(n).keys()];

    // rotation offset
    let rot = rotation + PI * angle / 180;

    // create polygon points on a circle
    const pts = range(sides).map( i => { 
        const a = 2 * PI  * i / sides + rot;
        return { x: radius * sin( a ), y: radius * cos( a ) }
    });

    // draw poly
    const g = this;

    // drawing style
    const cline = 0x000000;
    const cfill = 0xffffff;
    const alpha = 0.7 // somewhat transparent
    const offset = 1.0; // inset lines

    g.lineStyle(4, cline, alpha, offset);
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
