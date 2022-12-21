import Phaser from "phaser";
import Align from "./utilities/align";
import AlignGrid from "./utilities/alignGrid";

export default class GameStart extends Phaser.Scene {
  aGrid!: AlignGrid;
  align!: Align;
  gamestart!: Phaser.GameObjects.Image;
  constructor() {
    super("game-start");
  }
  init() {
    this.aGrid = new AlignGrid({
      scene: this,
      rows: 11,
      cols: 11,
      height: innerHeight,
      width: innerWidth,
    });
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
      this.scene.remove();
    });
  }
}
