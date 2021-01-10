import keyboard from "./keyboard.js";

// enable fullscreen key combo
export default function initFullscreenShortcut(key = 'f', modifier) {
  const key1 = keyboard(key);
  const key2 = modifier && keyboard(modifier);
  key1.release = () => {
    if (!key2 || key2.isDown) toggleFullScreen();
  };
}

// toggle fullscreen (works across browsers)
export function toggleFullScreen() {

  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;

  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    try {
        requestFullScreen.call(docEl);
    } catch(e) {
        console.log(e);
    }
   
  } else {
    cancelFullScreen.call(doc);
  }

}
