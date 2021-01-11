// Import all

import TiledMap from './tiledmap.js';
import { app, options } from "./pixi-app.js";
import resize from "./resize.js";
import { FloatingSprite, AnchoredSprite, StepperSprite } from "./sprite.js";
import colorFilter from "./filters/colorFilter.js";
import fullscreen from "./fullscreen.js";
import Poly from "./poly.js";
import webfonts from "./webfonts.js";
import helpscreen from "./helpscreen.js";
import menuscreen from "./menu.js";
import hilite from './hilite.js';

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

  let layer = new TiledMap(app, "tilesheet", "tiledmap"); 
  app.stage.addChild(layer);

  // create a sprite the animates while moving
  let pixelpal = new FloatingSprite("pixelpal", "walk", 2);
  app.stage.addChild(pixelpal);

  // create a sprite that uses anchors for animation
  let littleguy = new AnchoredSprite("littleguy", "walk", 10);
  app.stage.addChild(littleguy);

  // create a sprite that lets us step through individual frames using arrow keys
  let stepperguy = new StepperSprite("littleguy", "walk", 10);

  // add a custom color filter, because we can ...
  stepperguy.filters = [
    colorFilter(0xff3333, 0x3333ff),
    colorFilter(0xcc0000, 0x0000cc)
  ];

  hilite(littleguy);
  hilite(stepperguy);
  hilite(pixelpal);

  app.stage.addChild(stepperguy);

  // create some custom graphics and add it to the stage

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

  menuscreen("m");


  
}
