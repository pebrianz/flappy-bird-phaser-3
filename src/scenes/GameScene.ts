import Phaser from "phaser";
import AlignGrid from "../utilities/alignGrid";
import Align from "../utilities/align";
import Pipe from "../gameobjects/Pipe";
import Bird from "../gameobjects/Bird";
import { BodyType } from "matter";

export default class GameScene extends Phaser.Scene {
  public aGrid!: AlignGrid;
  public align!: Align;
  private bird!: Bird;
  private pipes!: Array<Pipe>;
  private bg!: Phaser.GameObjects.TileSprite;
  private ground1!: Phaser.Physics.Matter.Sprite;
  private ground2!: Phaser.Physics.Matter.Image;
  private score!: number;
  private fps!: Phaser.GameObjects.Text;
  private rnd = Phaser.Math.RND;
  private scoreGroup!: Phaser.GameObjects.Group;
  constructor() {
    super("game-scene");
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
    this.pipes = [];
    this.score = 0;
  }
  preload() {
    this.load.image("background", "assets/GameObjects/background.png");
    this.load.image("ground", "assets/GameObjects/base.png");
    this.load.image("pipe", "assets/GameObjects/pipe.png");
    this.load.image(
      "birddownflap",
      "assets/GameObjects/yellowbird-downflap.png"
    );
    this.load.image("birdmidflap", "assets/GameObjects/yellowbird-midflap.png");
    this.load.image("birdupflap", "assets/GameObjects/yellowbird-upflap.png");
    for (let i = 0; i <= 9; i++) {
      this.load.image(`digit${i}`, `assets/UI/Numbers/${i}.png`);
    }
  }
  create() {
    this.bg = this.add.tileSprite(0, 0, 0, 0, "background");
    this.align.scaleToGameH(this.bg, 0.9);
    this.aGrid.placeAt(5, 4, this.bg);

    this.bird = new Bird(this, {
      birddownflap: "birddownflap",
      birdmidflap: "birdmidflap",
      birdupflap: "birdupflap",
    });

    this.input.on("pointerdown", () => {
      this.bird.fly();
    });

    this.ground1 = this.matter.add.sprite(0, 0, "ground", 0, {
      isStatic: true,
    });
    this.ground1.depth = 10;
    this.align.scaleToGameW(this.ground1, 1);
    this.aGrid.placeAtOriginBottom(5, 11, this.ground1);

    this.ground2 = this.matter.add.sprite(0, 0, "ground", 0, {
      isStatic: true,
    });
    this.ground2.depth = 10;
    this.align.center(this.ground2);
    this.align.scaleToGameW(this.ground2, 1);
    this.aGrid.placeAtOriginBottom(16, 11, this.ground2);

    this.scoreGroup = this.add.group();
    let digit = this.add.image(0, 0, `digit0`);
    this.align.scaleToGameH(digit, 0.04);
    this.aGrid.placeAt(5, 0.5, digit);
    digit.depth = 12;
    this.scoreGroup.add(digit);

    this.fps = this.add.text(0, 0, "", {
      font: "600 1rem sans-serif",
      color: "#000000",
    });
    this.align.scaleToGameH(this.fps, 0.025);
    this.aGrid.placeAt(0.5, 0.25, this.fps);
    this.fps.depth = 11;

    this.scene.pause();
    this.scene.launch("game-start");
  }
  update() {
    this.bg.tilePositionX -= (innerWidth * -0.2) / 100;

    this.matter.body.translate(this.ground1.body as BodyType, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
    this.matter.body.translate(this.ground2.body as BodyType, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
    if (this.ground1.x < -innerWidth / 2) {
      this.aGrid.placeAtOriginBottom(16, 11, this.ground1);
    }
    if (this.ground2.x < -innerWidth / 2) {
      this.aGrid.placeAtOriginBottom(16, 11, this.ground2);
    }
    const frameCount = this.game.getFrame();
    if (frameCount % this.rnd.pick([75, 150]) === 0) {
      this.pipes.push(new Pipe(this, "pipe"));
    }
    for (const pipe of this.pipes) {
      pipe.update();
      this.bird.bird.setOnCollideWith(pipe.sensor, () => {
        this.score += 1;
        this.scoreGroup.clear(true);
        let digits = this.score.toString().split("");
        for (let i = 0; i < digits.length; i++) {
          let digit = this.add.image(0, 0, `digit${digits[i]}`);
          this.align.scaleToGameH(digit, 0.04);
          this.aGrid.placeAt(5, 0.5, digit);
          digit.depth = 12;
          digit.x += (digit.displayHeight / 2) * i;
          this.scoreGroup.add(digit);
        }
      });
      this.bird.bird.setOnCollideWith(
        [this.ground1, this.ground2, pipe.pipeTop, pipe.pipeBottom],
        () => {
          this.input.enabled = false;
          this.scene.launch("game-over");
        }
      );
    }
    const fps = this.game.loop.actualFps.toFixed(0);
    this.fps.setText(`FPS: ${fps}`);
  }
}
