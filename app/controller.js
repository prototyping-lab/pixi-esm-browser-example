import keyboard from "./keyboard.js";


let left = oneof("ArrowLeft", "a");
let right = oneof("ArrowRight", "d");
let up = oneof("ArrowUp", "w");
let down = oneof("ArrowDown", "s");

// use any of the keycodes
function oneof(... keycodes) {
  let keys = keycodes.map( keyboard );
  return {
    // setter to set the press functions on all the keys
    set press(fn) {
      for(let key in keys) {
        keys[key].press = fn;
      }
    },
    // setter to set the release functions on all the keys
    set release(fn) {
      for(let key in keys) {
        keys[key].release = fn;
      }
    }
  }
}

/*
left.press = () => {
  console.log("left");
};
right.press = () => {
  console.log("right");
};
up.press = () => {
  console.log("up");
};
down.press = () => {
  console.log("down");
};
*/

export default {
  left,
  right,
  up,
  down,
};
