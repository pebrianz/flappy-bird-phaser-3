import { BodyType } from "matter";
import Phaser from "phaser";

import Align from "../utilities/align";
import AlignGrid from "../utilities/alignGrid";
import Bird, { FramesKey } from "../gameobjects/Bird";
import Obstacle from "../gameobjects/Obstacle";

export default class GameScene extends Phaser.Scene {
  gameWidth = 0;
  gameHeight = 0;
  aGrid!: AlignGrid;
  align!: Align;
  bg!: Phaser.GameObjects.TileSprite;
  bird!: Bird;
  obstacles!: Array<Obstacle>;
  ground!: Phaser.Physics.Matter.Sprite;
  fps!: Phaser.GameObjects.Text;
  private score!: number;
  private bestScore!: number;
  scoreGroup!: Phaser.GameObjects.Group;
  rnd = Phaser.Math.RND;
  constructor() {
    super("game-scene");
  }
  init() {
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.aGrid = new AlignGrid({
      scene: this,
      rows: 11,
      cols: 11,
      width: this.gameWidth,
      height: this.gameHeight,
    });
    this.align = new Align(this);
    this.obstacles = [];
    this.score = 0;
    this.bestScore = Number(localStorage.getItem("best-score")) || 0;
    this.scoreGroup = this.add.group();
  }
  preload() {
    this.load.image("background", "assets/GameObjects/background.png");
    this.load.image("birddownflap", "assets/GameObjects/birddownflap.png");
    this.load.image("birdmidflap", "assets/GameObjects/birdmidflap.png");
    this.load.image("birdupflap", "assets/GameObjects/birdupflap.png");
    this.load.image("ground", "assets/GameObjects/base.png");
    this.load.image("pipe", "assets/GameObjects/pipe.png");
    for (let i = 0; i <= 9; i++) {
      this.load.image(`digit${i}`, `assets/UI/Numbers/${i}.png`);
    }
  }
  create() {
    this.bg = this.add.tileSprite(0, 0, 0, 0, "background");
    this.bg.displayHeight = this.gameHeight * 0.85;
    this.bg.scaleX = this.bg.scaleY;
    this.bg.setOrigin(0, 0);

    const framesKey: FramesKey = {
      birdupflap: "birdupflap",
      birdmidflap: "birdmidflap",
      birddownflap: "birddownflap",
    };
    this.bird = new Bird(this, this.matter.world, "birdupflap", framesKey);
    if (this.gameHeight > this.gameWidth * 2) {
      this.bird.displayWidth = this.gameWidth * 0.12;
      this.bird.scaleY = this.bird.scaleX;
    } else {
      this.bird.displayHeight = this.gameHeight * 0.045;
      this.bird.scaleX = this.bird.scaleY;
    }

    this.aGrid.placeAt(2, 2, this.bird);
    this.bird.setFixedRotation();
    this.input.on("pointerdown", () => {
      this.bird.fly();
    });

    this.ground = this.matter.add.sprite(
      this.gameWidth / 2,
      this.bg.y + this.bg.displayHeight,
      "ground",
      0,
      {
        isStatic: true,
      }
    );
    this.ground.displayHeight = this.gameHeight * 0.2;
    this.ground.scaleX = this.ground.scaleY;
    this.ground.y += this.ground.displayHeight / 2;
    this.ground.depth = 1;

    // upper limit
    this.matter.add.rectangle(this.gameWidth / 2, -40, this.gameWidth, 80, {
      isStatic: true,
    });

    const digit = this.add.image(0, 0, `digit0`);
    digit.depth = 2;
    digit.scale = 0.91;
    this.aGrid.placeAt(5, 0.5, digit);
    this.scoreGroup.add(digit);

    this.fps = this.add.text(0, 0, "", {
      font: "600 1rem sans-serif",
      color: "#000000",
    });
    this.fps.depth = 3;
    this.aGrid.placeAt(0.5, 0.25, this.fps);
    this.align.scaleToGameHeight(this.fps, 0.025);

    this.scene.pause();
    this.scene.launch("game-start");

    // this.aGrid.show()
    //this.aGrid.showNumbers();
  }
  update() {
    this.bg.tilePositionX -= (this.gameWidth / 1000) * -2;

    const frameCount = this.game.getFrame();
    if (frameCount % this.rnd.pick([75, 150]) == 0) {
      this.obstacles.push(new Obstacle(this, "pipe"));
    }
    for (const obstacle of this.obstacles) {
      obstacle.update();
      this.bird.setOnCollideWith(obstacle.sensor, () => {
        this.updateScore();
      });
      this.bird.setOnCollideWith(
        [this.ground, obstacle.pipeBottom, obstacle.pipeTop],
        () => {
          this.gameover();
        }
      );
    }
    this.bestScore = this.updateBestScore();
    const fps = this.game.loop.actualFps.toFixed(0);
    this.fps.setText(`FPS: ${fps}`);
  }
  gameover() {
    this.input.enabled = false;
    this.matter.body.setInertia(this.bird.body as BodyType, this.bird.inertia);
    this.scene.launch("game-over", {
      bestScore: this.bestScore,
      score: this.score,
    });
  }
  updateBestScore() {
    this.bestScore = Number(localStorage.getItem("best-score"));
    if (this.score > this.bestScore) {
      localStorage.setItem("best-score", `${this.score}`);
      return this.score;
    }
    return this.bestScore;
  }
  updateScore() {
    this.score += 1;
    this.scoreGroup.clear(true);

    const score = this.score.toString().split("");
    score.map((value) => {
      let digit = this.matter.add.image(0, 0, `digit${value}`, 0, {
        isSensor: true,
        isStatic: true,
      });
      digit.scale = 0.91;
      this.aGrid.placeAt(5, 0.5, digit);
      digit.depth = 2;
      this.scoreGroup.add(digit);
    });

    const digits = this.scoreGroup.getChildren();
    digits.map((value, index) => {
      let digit = value as Phaser.Physics.Matter.Image;
      if (digits[index - 1]) {
        let prevDigit = digits[index - 1] as Phaser.Physics.Matter.Image;
        digit.x =
          prevDigit.x + prevDigit.displayWidth / 1.8 + digit.displayWidth / 1.8;
      }
    });
  }
}
