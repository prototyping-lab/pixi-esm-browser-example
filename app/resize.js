import { app } from './pixi-app.js';

// dynamically resize the renderer to fit the window
export default function resizeWindow(ratio) {

  document.body.appendChild(app.view);

  // add resize handler
  window.onresize = resize;

  // resize once in the beginning
  resize();

  // scale the renderer to match the window size
  function resize() {
    let w, h;
    if (window.innerWidth / window.innerHeight >= ratio) {
      w = window.innerHeight * ratio;
      h = window.innerHeight;
    } else {
      w = window.innerWidth;
      h = window.innerWidth / ratio;
    }
    app.renderer.view.style.width = w + "px";
    app.renderer.view.style.height = h + "px";
  }
}
