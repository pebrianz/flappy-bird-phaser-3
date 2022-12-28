import { BodyType } from "matter";
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
    const gameover = this.add.image(0, 0, "scoreboard");
    this.align.scaleToGameHeight(gameover, 0.4);
    this.align.center(gameover);
    gameover.depth = 2;

    const replay = this.add.image(0, 0, "replay");
    this.align.scaleToGameHeight(replay, 0.08);
    this.aGrid.placeAtIndex(82, replay);
    replay.depth = 2;

    this.updateBestScore();
    this.updateScore();

    replay.setInteractive();
    replay.on("pointerdown", () => {
      this.scene.start("game-scene");
    });
  }
  updateBestScore() {
    const bestScore = this.bestScore.toString().split("");
    bestScore.map((value) => {
      let digit = this.matter.add.image(0, 0, `digit${value}`, 0, {
        isSensor: true,
        isStatic: true,
      });
      this.align.scaleToGameHeight(digit, 0.024);
      this.aGrid.placeAt(7.3, 5.22, digit);
      digit.depth = 2;
      this.bestScoreGroup.add(digit);
    });
    const digits = this.bestScoreGroup.getChildren();
    digits.map((value, index) => {
      let digit = value as Phaser.Physics.Matter.Image;
      let digitBody = digit.body as BodyType;
      let digitWidth = digitBody.bounds.max.x - digitBody.bounds.min.x;
      if (digits[index - 1]) {
        let prevDigit = digits[index - 1] as Phaser.Physics.Matter.Image;
        let prevDigitBody = prevDigit.body as BodyType;
        let prevDigitWidth =
          prevDigitBody.bounds.max.x - prevDigitBody.bounds.min.x;
        prevDigit.x = prevDigit.x - prevDigitWidth / 2 - digitWidth / 2;
      }
    });
  }
  updateScore() {
    const score = this.score.toString().split("");
    score.map((value) => {
      let digit = this.matter.add.image(0, 0, `digit${value}`, 0, {
        isSensor: true,
        isStatic: true,
      });
      this.align.scaleToGameHeight(digit, 0.022);
      this.aGrid.placeAt(7.3, 4.6, digit);
      digit.depth = 2;
      this.scoreGroup.add(digit);
    });
    const digits = this.scoreGroup.getChildren();
    digits.map((value, index) => {
      let digit = value as Phaser.Physics.Matter.Image;
      let digitBody = digit.body as BodyType;
      let digitWidth = digitBody.bounds.max.x - digitBody.bounds.min.x;
      if (digits[index - 1]) {
        let prevDigit = digits[index - 1] as Phaser.Physics.Matter.Image;
        let prevDigitBody = prevDigit.body as BodyType;
        let prevDigitWidth =
          prevDigitBody.bounds.max.x - prevDigitBody.bounds.min.x;
        prevDigit.x = prevDigit.x - prevDigitWidth / 2 - digitWidth / 2;
      }
    });
  }
}
