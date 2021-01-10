# PIXI - ESM Browser Example

Example of how to create a Pixel Platformer in PIXI.js using ES6 Modules directly in the browser.

- Loading tilesheets and tilemaps
- Loading spritesheets
- a stepper sprite with keyboard control
- floating sprite and anchored sprite motion

## Installation

- Just run it in your browser

## Modules

- `app.js` — the demo app
- `sprite.js` — custom sprite classes with asset loading
  - `FloatingSprite` (moving continuously) 
  - `AnchoredSprite` (using anchors for each frame)
  - `StepperSprite` (anchored sprite with keyboard control for debugging of animations)
- `keyboard.js` — keyboard events and states
- `controller.js` — your own extensible controller (add voice control, gesture control, etc here)
- `resize.js` — function to resize the stage dynamically
- `fullscreen.js` —  toggle fullscreen
- `helpscreen.js`—  toggle help screen
- `tiledmap.js` — load tile maps created by Tiled Map Editor
- `pixi-tilemap.js` — efficient implementation of tilemaps. ([pixi-tilemap](https://github.com/pixijs/pixi-tilemap) bundled as ESM for usage in the browser)
- `filters` - directory for filter modules
  - `colorFilter.js` — just a quick color filter to change individual sprite colors using a GLSL fragement shader
  - all other filters are from [pixi-filters](https://github.com/pixijs/pixi-filters)
- `hilite.js` —  function to hilite graphics on mouse hover
- `poly.js` —  example for a custom graphics object
- `webfonts.js` —  function to load google webfonts using [webfont loader](https://github.com/typekit/webfontloader) 
- `math.js` —  Javascript math functions  as ES6 modules (so we can write `sin` instead of `Math.sin`)  
See `poly.js` for an example



## Assets

- `bitcraft-littleguy.png` — 8 frames walking animation — created with Piksel App + TexturePacker
- `bitcraft-littleguy.json` — spritesheet data created with TexturePacker. Adjusted anchor points / pivot points to create a convincing animation
- `kenney-pixelpal.png` — free sprite from kenney's [simplified-platformer-pack](https://www.kenney.nl/assets/simplified-platformer-pack)
- `kenney-tilesheet.png` — free tiles from kenney's  [simplified-platformer-pack](https://www.kenney.nl/assets/simplified-platformer-pack)
## Tools

- [Piksel App](https://www.piskelapp.com/) to create animations
- [Texture Packer](https://www.codeandweb.com/texturepacker) to create spritesheets and tilesheets
- [Tiled Map Editor](https://www.mapeditor.org/) to create the level

# License

MIT licensed
