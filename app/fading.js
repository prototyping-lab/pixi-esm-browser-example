import * as PIXI from "./pixi.js";
import { app, options } from "./pixi-app.js";

function createTexture() {
  return PIXI.RenderTexture.create({
    width: options.width,
    height: options.height,
  });
}

export default class Fading extends PIXI.Sprite {
  constructor(sprite, factor = 0.8) {
    super();
    this.sprite = sprite;
    this.buffer = new PIXI.Sprite(createTexture());
    this.texture = createTexture();
    this.buffer.alpha = factor;
    // update time onFrameChange is called on the original sprite
    sprite.onFrameChange = this.update.bind(this);
    //app.ticker.add(this.tick, this);
  }

  update() {
    // render orignal sprite to buffer
    app.renderer.render(this.sprite, this.buffer.texture, false);
    // render buffer to this texture
    app.renderer.render(this.buffer, this.texture, true);
    // swap buffer texture and our texture
    const tmp = this.texture;
    this.texture = this.buffer.texture;
    this.buffer.texture = tmp;
  }
}
