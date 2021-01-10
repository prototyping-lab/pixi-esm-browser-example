
import * as PIXI from "./pixi.js";

// options for pixi app
export const options = {
  antialias: true,
  autoDensity: true,
  backgroundColor: "0xaaaaaa",
  width: 1200,
  height: 800,
};

// singleton to be reused elsewhere
export const app = new PIXI.Application(options);
