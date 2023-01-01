import Phaser from "phaser";

import Align from "../utilities/align";
import AlignGrid from "../utilities/alignGrid";

export default class GameOver extends Phaser.Scene {
  align!: Align;
  aGrid!: AlignGrid;
  bestScore!: number;
  score!: number;
  bestScoreGroup!: Phaser.GameObjects.Group;
  scoreGroup!: Phaser.GameObjects.Group;
  gameover!: Phaser.GameObjects.Image;
  replay!: Phaser.GameObjects.Image;
  constructor() {
    super("game-over");
  }
  init(data: any) {
    this.aGrid = new AlignGrid({
      scene: this,
      rows: 11,
      cols: 11,
      width: innerWidth,
      height: innerHeight,
    });
    this.align = new Align(this);
    this.bestScore = data.bestScore;
    this.score = data.score;
    this.bestScoreGroup = this.add.group();
    this.scoreGroup = this.add.group();
  }
  preload() {
    this.load.image("scoreboard", "assets/UI/scoreboard.png");
    this.load.image("gameover", "assets/UI/gameover.png");
    this.load.image("replay", "assets/UI/replay.png");
  }
  create() {
    this.gameover = this.add.image(0, 0, "scoreboard");
    this.gameover.displayWidth = innerWidth * 0.6;
    this.gameover.scaleY = this.gameover.scaleX;
    this.align.center(this.gameover);
    this.gameover.depth = 2;

    this.replay = this.add.image(
      this.gameover.x,
      this.gameover.y + this.gameover.displayHeight / 2.5,
      "replay"
    );
    this.replay.displayWidth = innerWidth * 0.25;
    this.replay.scaleY = this.replay.scaleX;
    this.replay.depth = 2;
    //   this.aGrid.placeAtIndex(82, this.replay);

    this.updateBestScore();
    this.updateScore();

    this.replay.setInteractive();
    this.replay.on("pointerdown", () => {
      this.scene.start("game-scene");
    });
  }
  updateScore() {
    const score = this.score.toString().split("");
    score.map((value) => {
      let digit = this.matter.add.image(0, 0, `digit${value}`, 0, {
        isSensor: true,
        isStatic: true,
      });
      const gameover = this.gameover;
      digit.scale = gameover.scale * 0.5;
      digit.setPosition(
        gameover.x + (gameover.displayWidth / 2) * 0.74,
        gameover.y + (gameover.displayHeight / 2) * -0.18
      );
      digit.depth = 2;
      this.scoreGroup.add(digit);
    });
    const digits = this.scoreGroup.getChildren();
    digits.reverse().map((value, index) => {
      let digit = value as Phaser.Physics.Matter.Image;
      if (digits[index - 1]) {
        let prevDigit = digits[index - 1] as Phaser.Physics.Matter.Image;
        digit.x =
          prevDigit.x - prevDigit.displayWidth / 1.8 - digit.displayWidth / 1.8;
      }
    });
  }
  updateBestScore() {
    const bestScore = this.bestScore.toString().split("");
    bestScore.map((value) => {
      let digit = this.matter.add.image(0, 0, `digit${value}`, 0, {
        isSensor: true,
        isStatic: true,
      });
      const gameover = this.gameover;
      digit.scale = gameover.scale * 0.5;
      digit.setPosition(
        gameover.x + (gameover.displayWidth / 2) * 0.74,
        gameover.y + (gameover.displayHeight / 2) * 0.11
      );
      digit.depth = 2;
      this.bestScoreGroup.add(digit);
    });
    const digits = this.bestScoreGroup.getChildren();
    digits.reverse().map((value, index) => {
      let digit = value as Phaser.Physics.Matter.Image;
      if (digits[index - 1]) {
        let prevDigit = digits[index - 1] as Phaser.Physics.Matter.Image;
        digit.x =
          prevDigit.x - prevDigit.displayWidth / 1.8 - digit.displayWidth / 1.8;
      }
    });
  }
}
