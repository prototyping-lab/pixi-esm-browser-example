import { app } from "./pixi-app.js";
import * as PIXI from "./pixi.js";
import keyboard from "./keyboard.js";

// create a menuscreen once this module in loaded
let menuscreen;


// enable helpscren key combo
export default function initmenuscreenShortcut(key = "h", modifier) {

	const key1 = keyboard(key);
	const key2 = modifier && keyboard(modifier);
	key1.release = () => {
		if (!key2 || key2.isDown) togglemenuscreen();
  };

  // create and add menuscreen
  menuscreen = createmenuscreen();
  app.stage.addChild(menuscreen);

}

function togglemenuscreen() {
  menuscreen.visible = !menuscreen.visible;
}

// create help screen
function createmenuscreen() {

  let headerStyle = {
    fontFamily: "Staatliches",
    fontSize: 100,
    letterSpacing: 10,
    fill: "#fff",
    align: "left",
    strokeThickness: 1,
    stroke: "#000",
    dropShadow: true,
    dropShadowBlur: 3,
    dropShadowColor: "#666666"
  };

  let keyStyle = {
    fontFamily: "Staatliches",
    fontSize: 50,
    fill: "#fff",
    align: "left",
    dropShadow: true,
    dropShadowDistance: 1,
    dropShadowColor: "#999999",
  };

  let valueStyle = {
    fontFamily: "Raleway",
    fontSize: 30,
    letterSpacing: 3,
    fill: "#555",
    align: "left",
  };

  let shortcuts = {
    'h': 'help',
    'f': 'fullscreen'
  }

  let menuscreen = new PIXI.Container();
  menuscreen.x = 50;
  menuscreen.y = 50;
  menuscreen.visible = false;

  // draw help screen box
  let bg = new PIXI.Graphics();
  bg.alpha = 0.8;
  bg.lineStyle(10, 0x000000, 0.7, 1);
  bg.beginFill(0xcccccc);
  bg.drawRoundedRect(0, 0, 1100, 700, 50);
  bg.endFill();
  menuscreen.addChild(bg);

  // display header
  const header = new PIXI.Text("Menu", headerStyle);
  header.x = 50;
  header.y = 50;
  menuscreen.addChild(header);

  let y = 150;

  for(let key in shortcuts) {

    // display shortcut
    const shortcut = new PIXI.Text(`[${key}]`, keyStyle);
    shortcut.x = 50;
    shortcut.y = y;
    menuscreen.addChild(shortcut);

    // display info
    const info = new PIXI.Text(shortcuts[key], valueStyle);
    info.x = 120;
    info.y = y;
    menuscreen.addChild(info);

    // next line
    y += 50;

  }

  return menuscreen;

}
