import Phaser from "phaser";
import Align from "./utilities/align";

export default class GameOver extends Phaser.Scene {
  align!: Align;
  constructor() {
    super("game-over");
  }
  init() {
    this.align = new Align(this);
  }
  preload() {
    this.load.image("gameover", "assets/gameover.png");
  }
  create() {
    const gameover = this.add.image(
      innerWidth / 2,
      innerHeight / 2,
      "gameover"
    );
    this.align.scaleToGameH(gameover, 0.06);
  }
}
