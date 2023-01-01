import Phaser from "phaser";

import Align from "../utilities/align";

export default class GameStart extends Phaser.Scene {
  align!: Align;
  gamestart!: Phaser.GameObjects.Image;
  constructor() {
    super("game-start");
  }
  init() {
    this.align = new Align(this);
  }
  preload() {
    this.load.image("gamestart", "assets/UI/message.png");
  }
  create() {
    this.gamestart = this.add.image(0, 0, "gamestart");
    this.align.center(this.gamestart);
    this.gamestart.displayWidth = innerWidth * 0.45;
    this.gamestart.scaleY = this.gamestart.scaleX;

    this.input.on("pointerdown", () => {
      this.gamestart.destroy();
      this.scene.resume("game-scene");
      this.scene.stop("game-start");
    });
  }
}
