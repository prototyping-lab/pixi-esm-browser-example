import { app } from "./pixi-app.js";
import * as PIXI from "./pixi.js";
import keyboard from "./keyboard.js";

// create a helpscreen once this module in loaded
let helpscreen ;


// enable helpscren key combo
export default function initHelpScreenShortcut(key = "h", modifier) {

	const key1 = keyboard(key);
	const key2 = modifier && keyboard(modifier);
	key1.release = () => {
		if (!key2 || key2.isDown) toggleHelpScreen();
  };

  // create and add helpscreen
  helpscreen = createHelpScreen();
  app.stage.addChild(helpscreen);

}

function toggleHelpScreen() {
  helpscreen.visible = !helpscreen.visible;
}

// create help screen
function createHelpScreen() {

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

  let helpscreen = new PIXI.Container();
  helpscreen.x = 50;
  helpscreen.y = 50;
  helpscreen.visible = false;

  // draw help screen box
  let bg = new PIXI.Graphics();
  bg.alpha = 0.8;
  bg.lineStyle(10, 0x000000, 0.7, 1);
  bg.beginFill(0xcccccc);
  bg.drawRoundedRect(0, 0, 1100, 700, 50);
  bg.endFill();
  helpscreen.addChild(bg);

  // display header
  const header = new PIXI.Text("Keyboard Shortcuts", headerStyle);
  header.x = 50;
  header.y = 50;
  helpscreen.addChild(header);

  let y = 150;

  for(let key in shortcuts) {

    // display shortcut
    const shortcut = new PIXI.Text(`[${key}]`, keyStyle);
    shortcut.x = 50;
    shortcut.y = y;
    helpscreen.addChild(shortcut);

    // display info
    const info = new PIXI.Text(shortcuts[key], valueStyle);
    info.x = 120;
    info.y = y;
    helpscreen.addChild(info);

    // next line
    y += 50;

  }

  return helpscreen;

}
