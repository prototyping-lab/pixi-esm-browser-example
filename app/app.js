// Import all
import { app, options } from "./pixi-app.js";
import resize from "./resize.js";
import fullscreen from "./fullscreen.js";
import Poly from "./poly.js";
import webfonts from "./webfonts.js";
import helpscreen from "./helpscreen.js";
import HexGrid from "./hexgrid.js";
// import hilite from './hilite.js';

(async () => {
  // make sure to load all webfonts first
  await webfonts(["Staatliches", "Raleway:700"]);

  // then load everything else using the pixi loader
  app.loader
    .add("littleguy", "assets/bitcraft-littleguy.json")
    .add("pixelpal", "assets/kenney-pixelpal.json")
    .add("tilesheet", "assets/kenney-tilesheet.json")
    .add("tiledmap", "assets/tiled-tilemap-8x8.json")
    .load(startup);
})();

// start animation
function startup() {
  let aspectRatio = options.width / options.height;

  // dynamically resize the app to fixed aspect ratio
  resize(aspectRatio);

  // Use hexgrid
  const grid = new HexGrid();
  app.stage.addChild(grid);

  // create some polys and add them to the stage

  const radius = 100;
  const poly = new Poly(8, radius, 22.5);
  poly.x = app.renderer.width / 2;
  poly.y = app.renderer.height / 2;
  //hex.angle = 30;
  app.stage.addChild(poly);

  let poly2 = new Poly(6, radius, 30);
  poly2.x = app.renderer.width / 2 + 2 * radius;
  poly2.y = app.renderer.height / 2;
  //hex2.angle = 30;
  app.stage.addChild(poly2);

  // fullscreen('f', 'Control');
  fullscreen("f");
  
  // fullscreen('h', 'Control');
  helpscreen("h");
  
}
