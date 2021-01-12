import * as PIXI from "./pixi.js";
import stepper from "./stepper.js";
import controller from "./controller.js";
import { app } from './pixi-app.js';


// sprite with live graphics (extend this using a draw function)
// See lightning.js for an example
export class GraphicsSprite extends PIXI.Sprite {
  constructor() {
    super();
    this.animationSpeed = 60;
    this.g = new PIXI.Graphics();
    app.ticker.add(this.update, this);
  }

  set animationSpeed(speed) {
    this.delay = 60 / speed;
  }

  set delay(d) {
    this._delay = d;
    this._currentTime = d;
  }

  update(dt) {
    this._currentTime += dt;
    if (this._currentTime > this._delay) {
      this.updateTexture();
      this._currentTime -= this._delay;
    }
  }

  // same hook as animated sprite
  updateTexture() {
    if(this.draw) {
        // update graphics
        this.draw();
        // create sprite texture from graphics
        this.texture = app.renderer.generateTexture(this.g);
    }
    // provide same hook as animated sprite
    if (this.onFrameChange) {
      this.onFrameChange();
    }
  }
}

// extend PIXIs animated sprite
export class PixelSprite extends PIXI.AnimatedSprite {
  constructor(sheetId, animationId, pixelSize) {

    // Create animation from sprite sheet
    const sheet = app.loader.resources[sheetId].spritesheet;
    sheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    super(sheet.animations[animationId]);

    this.pixelSize = pixelSize;
    this.scale.set(pixelSize);
    
    this.initPosition();
    this.initMotion();
  }

  // start walking at the bottom left
  initPosition() {
    this.x = this.width/2;
    this.y = app.renderer.height;
  }

  // play the animation
  initMotion() {
    this.animationSpeed = 1 / 20;
    this.play();
  }
}


// Continuous floating + animation
export class FloatingSprite extends PixelSprite {
  initMotion() {
    this.animationSpeed = 1 / 10;
    let speed = 2;
    let ticker = PIXI.Ticker.shared;
    ticker.add(() => {
      this.position.x += speed;
    });
    this.play();
  }
}

// Updating anchor + movement at the end of the loop
export class AnchoredSprite extends PixelSprite {
  initMotion() {
    this.animationSpeed = 1 / 5;
    this.updateAnchor = true;

    this.initHitArea();

    // move the sprite forward after each loop
    this.onLoop = () => {
      this.position.x += this.pixelSize * 8;
    }

    this.play();
  }

  // create hit area and make sure it stays in sync with the anchor
  initHitArea() {
    this.hitArea = new PIXI.Rectangle( 0, 0, 6, 16 );
    this.updateHitArea();
    this.onFrameChange = () => {
      this.updateHitArea();      
    }
  }

  // position hit area relative to the anchor
  updateHitArea() {
    this.hitArea.x = 8 - this.anchor._x * 16 -  this.hitArea.width / 2;
    this.hitArea.y = 8 - this.anchor._y * 16 -  this.hitArea.height / 2;
  }
  
}

// Use the controller to step through the sprite animation
export class StepperSprite extends AnchoredSprite {
  initMotion() {
    this.updateAnchor = true;
    this.initHitArea();
    stepper(this, controller);
  }
}
