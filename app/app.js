// Import all
import { app, options } from "./pixi-app.js";
import resize from "./resize.js";
import fullscreen from "./fullscreen.js";
import { RegularPoly, polyPoints } from "./poly.js";
import webfonts from "./webfonts.js";
import helpscreen from "./helpscreen.js";
import HexGrid from "./hexgrid.js";
import { VoronoiButtons } from "./voronoidiagram.js"
import * as PIXI from "./pixi.js";

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

  // create a custom stage
  const stage = new PIXI.Container();

  // Use hexgrid
  const hexgrid = new HexGrid();
  stage.addChild(hexgrid);

  //Create a voronoi diagram
  const w = options.width;
  const h = options.height;
  let pts = [
     ... polyPoints(w / 2 - 240, h / 2, 12, 300),
     ... polyPoints(w / 2 + 240, h / 2, 12, 300) 
  ];
  const grid = new VoronoiButtons(pts);
  stage.addChild(grid);

  // create some polys and add them to the stage   
  const radius = 150;
  const poly = new RegularPoly(8, radius, 22.5);
  poly.x = options.width / 2;
  poly.y = options.height / 2;
  //hex.angle = 30;
  stage.addChild(poly);

  let poly2 = new RegularPoly(6, radius, 30);
  poly2.x = options.width / 2 + 2 * radius;
  poly2.y = options.height / 2;
  //hex2.angle = 30;
  stage.addChild(poly2);

  // add blur filter on top
    
  const bf = new PIXI.filters.BlurFilter(2);
  stage.filters = [bf];

  // add custom stage to app stage
  app.stage.addChild(stage);

  // fullscreen('f', 'Control');
  fullscreen("f");

  // helpscreen('h', 'Control');
  helpscreen("h");
    
  
}
