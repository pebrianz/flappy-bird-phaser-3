import Phaser from "phaser";
import Align from "../utilities/align";
import AlignGrid from "../utilities/alignGrid";

export default class GameOver extends Phaser.Scene {
  align!: Align;
  aGrid!: AlignGrid;
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
    this.load.image("scoreboard", "assets/UI/scoreboard.png");
    this.load.image("gameover", "assets/UI/gameover.png");
    this.load.image("replay", "assets/UI/replay.png");
  }
  create() {
    const gameover = this.add.image(0, 0, "scoreboard");
    this.align.scaleToGameH(gameover, 0.4);
    this.align.center(gameover);
    const replay = this.add.image(0, 0, "replay");
    this.align.scaleToGameH(replay, 0.08);
    this.aGrid.placeAtIndex(82, replay);
    replay.setInteractive();
    replay.on("pointerdown", () => {
      this.scene.start("game-scene");
    });
  }
}
