import { options } from "./pixi-app.js";
import * as PIXI from "./pixi.js";
import Voronoi from "./voronoi-core.js";
import { Poly } from "./poly.js";

const bbox = { xl: 0, xr: options.width, yt: 0, yb: options.height };

export class VoronoiDiagram extends PIXI.Graphics {
  constructor(pts) {
    super();

    const voronoi = new Voronoi();

    // create voronoi diagram
    const diagram = voronoi.compute(pts, bbox);

    this.drawVertices(pts, 0x663333);
    //this.drawEdges(this.diagram.edges);
    this.drawVertices(diagram.vertices, 0x333333);
    this.drawCells();
  }

  drawVertices(verts, color = 0x333333) {
    const g = this;
    const r = 5; // point radius
    g.lineStyle(0);
    g.beginFill(color, 0.3);
    verts.forEach((p) => {
      g.drawCircle(p.x, p.y, r);
    });
    g.endFill();
  }

  drawEdges(edges) {
    const g = this;
    const w = 10;
    g.lineStyle(w, 0x000000, 0.1);
    edges.forEach((e) => {
      g.moveTo(e.va.x, e.va.y);
      g.lineTo(e.vb.x, e.vb.y);
    });
  }

  drawCells() {
    const g = this;
    // draw cells

    g.lineStyle(6, 0x000000, 0.1, 0.5);
    const cells = this.diagram.cells;
    cells.forEach((cell) => {
      const pts = cell.halfedges.map((e) => {
        const p = e.getStartpoint();
        return { x: p.x, y: p.y };
      });
      g.drawPolygon(pts);
    });
  }
}

export class VoronoiButtons extends PIXI.Container {
  constructor(pts) {
    super();

    const voronoi = new Voronoi();
    const diagram = voronoi.compute(pts, bbox);

    diagram.cells.forEach((cell) => {
      const pts = cell.halfedges.map((e) => {
        const p = e.getStartpoint();
        return { x: p.x, y: p.y };
      });
      this.addChild(new Poly(pts));
    });
  }
}
