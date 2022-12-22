import Phaser from "phaser";
import Align from "../utilities/align";

export default class GameStart extends Phaser.Scene {
  private align!: Align;
  private gamestart!: Phaser.GameObjects.Image;
  constructor() {
    super("game-start");
  }
  init() {
    this.align = new Align(this);
  }
  preload() {
    this.load.image("gamestart", "assets/message.png");
  }
  create() {
    this.gamestart = this.add.image(
      innerWidth / 2,
      innerHeight / 2,
      "gamestart"
    );
    this.align.scaleToGameH(this.gamestart, 0.35);
    this.input.on("pointerdown", () => {
      this.gamestart.destroy();
      this.scene.resume("game-scene");
      this.scene.stop("game-start");
    });
  }
}
