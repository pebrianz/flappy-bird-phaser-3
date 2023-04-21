import { BodyType } from "matter";
import Phaser from "phaser";

import Bird from "../gameobjects/Bird";
import Ground from "../gameobjects/Ground";
import Obstacle from "../gameobjects/Obstacle";

export default class GameScene extends Phaser.Scene {
  gameWidth = 0;
  gameHeight = 0;
  bird!: Bird;
  bg!: Phaser.GameObjects.TileSprite;
  fps!: Phaser.GameObjects.Text;
  ground!: Ground;
  obstacles!: Array<Obstacle>;
  rnd = Phaser.Math.RND;
  score!: number;
  bestScore!: number;
  scoreGroup!: Phaser.GameObjects.Group;
  constructor() {
    super("game-scene");
  }
  init() {
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.obstacles = [];
    this.score = 0;
    this.bestScore = Number(localStorage.getItem("best-score")) || 0;
    this.scoreGroup = this.add.group();
  }
  preload() {
    this.load.image("background", "assets/background3.png");
    this.load.image("birddownflap", "assets/GameObjects/birddownflap.png");
    this.load.image("birdmidflap", "assets/GameObjects/birdmidflap.png");
    this.load.image("birdupflap", "assets/GameObjects/birdupflap.png");
    this.load.image("gamestart", "assets/UI/message.png");
    this.load.image("gameover", "assets/UI/gameover.png");
    this.load.image("ground", "assets/base2.png");
    this.load.image("pipe", "assets/GameObjects/pipe.png");
    this.load.image("scoreboard", "assets/UI/scoreboard.png");
    this.load.image("replay", "assets/UI/replay.png");
    for (let i = 0; i <= 9; i++) {
      this.load.image(`${i}`, `assets/UI/Numbers/${i}.png`);
    }
  }
  create() {
    this.bg = this.add.tileSprite(this.gameWidth / 2, 0, 0, 0, "background");
    this.bg.scale = 2.2;
    this.bg.setOrigin(0.5, 0);

    this.ground = new Ground(
      this,
      this.gameWidth / 2,
      this.bg.displayHeight,
      "ground"
    );
    this.ground.sprite.depth = 1;

    this.matter.add.rectangle(this.bg.x, -100, this.bg.displayWidth, 200, {
      isStatic: true,
    });

    this.bird = new Bird(this, this.gameWidth * 0.2, 200, "birdupflap", {
      birddownflap: "birddownflap",
      birdmidflap: "birdmidflap",
      birdupflap: "birdupflap",
    });
    this.bird.scale = 1.2;
    this.bird.setFixedRotation();
    this.input.on("pointerdown", () => this.bird.fly());

    const digit = this.add.image(this.gameWidth / 2, 75, `0`);
    digit.depth = 2;
    digit.scale = 0.71;
    this.scoreGroup.add(digit);

    this.fps = this.add.text(this.gameWidth * 0.15, 75, "", {
      font: "600 1rem sans-serif",
      color: "#000000",
    });
    this.fps.depth = 3;
    this.fps.setOrigin(0.5, 0.5);

    this.scene.pause();
    this.scene.launch("game-start");
  }
  update() {
    this.bg.tilePositionX += 0.8;
    this.ground.sprite.tilePositionX += 3.4;

    const frameCount = this.game.getFrame();
    if (frameCount % this.rnd.pick([75, 150]) === 0) {
      this.obstacles.push(new Obstacle(this, "pipe"));
    }
    for (const obstacle of this.obstacles) {
      obstacle.update();
      this.bird.setOnCollideWith(obstacle.sensor, () => this.updateScore());
      this.bird.setOnCollideWith(
        [this.ground.body, obstacle.pipeTop, obstacle.pipeBottom],
        () => this.gameover()
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
      let digit = this.matter.add.image(this.gameWidth / 2, 75, `${value}`, 0, {
        isSensor: true,
        isStatic: true,
      });
      digit.scale = 0.71;
      digit.depth = 2;
      this.scoreGroup.add(digit);
    });

    const digits = this.scoreGroup.getChildren();
    digits.map((value, index) => {
      let digit = value as Phaser.Physics.Matter.Image;
      if (digits[index - 1]) {
        let prevDigit = digits[index - 1] as Phaser.Physics.Matter.Image;
        prevDigit.x = prevDigit.x - (prevDigit.displayWidth / 1.8) * 2;
        digit.x =
          prevDigit.x + prevDigit.displayWidth / 1.8 + digit.displayWidth / 1.8;
      }
    });
  }
}
