
import { lerp, rand } from "./math.js";
import { options } from "./pixi-app.js";
import { GraphicsSprite } from "./sprite.js";

// animated lighting stroke  between two points
export default class Lightning extends GraphicsSprite {

  constructor(start, end, detail = 7, speed = 10) {
    super();
    this.start = start;
    this.end = end;
    this.detail = detail;
    this.animationSpeed = speed; // speed in fps
  }

  draw() {

    const g = this.g;
    const pts = recursiveStroke(this.start, this.end, this.detail);

    g.clear();

    // invisible rectangle to prevent cropping
    g.drawRect(0, 0, options.width, options.height);

    // polyline
    g.lineStyle(4, 0xffffff);
    g.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach((p) => g.lineTo(p.x, p.y));

  }
}

function recursiveStroke(p1, p2, iter = 4, width = 30) {
  if (iter <= 0) {
    return [p1, p2];
  } else {
    const d = width;
    const pm = {
      x: lerp(p1.x, p2.x, 0.5),
      y: lerp(p1.y, p2.y, 0.5) + d * rand(-1, 1),
    };
    const s1 = recursiveStroke(p1, pm, iter - 1, width);
    const s2 = recursiveStroke(pm, p2, iter - 1, width);
    s1.pop();
    return [...s1, ...s2];
  }
}
