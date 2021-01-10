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
- `keyboard.js` — keyboard events and states
- `controller.js` — your own extensible controller (add voice control, gesture control, etc here)
- `resize.js` — function to resize the stage dynamically
- `fullscreen.js` —  toggle fullscreen
- `helpscreen.js`—  toggle help screen
- `filters` - directory for filter modules
- `hilite.js` —  function to hilite graphics on mouse hover
- `poly.js` —  example for a custom graphics object
- `webfonts.js` —  function to load google webfonts using [webfont loader](https://github.com/typekit/webfontloader) 
- `math.js` —  Javascript math functions  as ES6 modules (so we can write `sin` instead of `Math.sin`)  
See `poly.js` for an example

- `hexgrid.js` —  function to draw a hexagon grid in the background, using `honeycomb.min.js` from the [honeycomb library](https://github.com/flauwekeul/honeycomb) ([esm here](https://unpkg.com/honeycomb-grid@3.1.7/dist/honeycomb.esm.min.js))
- `voronoidiagram.js` —  functions to draw voronoi diagram, using `voronoi-core.js` from this [voronoi library](https://github.com/gregross/javascript-voronoi).

# License

MIT licensed
