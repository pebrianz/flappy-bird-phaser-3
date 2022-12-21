import Phaser from "phaser";
import Align from "./utilities/align";
import AlignGrid from "./utilities/alignGrid";

export default class GameOver extends Phaser.Scene {
  aGrid!: AlignGrid;
  align!: Align;
  constructor() {
    super("game-over");
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
