import Phaser from "phaser";
import AlignGrid from "./utilities/alignGrid";
import Align from "./utilities/align";
import Pipe from "./Pipe";
import Bird from "./Bird";

export default class GameScene extends Phaser.Scene {
  public aGrid!: AlignGrid;
  public align!: Align;
  private bird!: Bird;
  private pipes!: Array<Pipe>;
  private bg!: Phaser.GameObjects.Image;
  private ground!: Phaser.Physics.Matter.Image;
  private score!: number;
  private fps!: Phaser.GameObjects.Text;
  private scoreboard!: Phaser.GameObjects.Text;
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
    this.load.image("background", "assets/background.png");
    this.load.image("ground", "assets/base.png");
    this.load.image("pipe", "assets/pipe.png");
    this.load.image("birddownflap", "assets/bird/yellowbird-downflap.png");
    this.load.image("birdmidflap", "assets/bird/yellowbird-midflap.png");
    this.load.image("birdupflap", "assets/bird/yellowbird-upflap.png");
  }
  create() {
    this.bg = this.add.image(0, 0, "background");
    this.align.center(this.bg);
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

    this.ground = this.matter.add.image(0, 0, "ground", 0, {
      isStatic: true,
    });
    this.ground.depth = 10;
    this.align.center(this.ground);
    this.align.scaleToGameW(this.ground, 1);
    this.aGrid.placeAtOriginBottom(5, 11, this.ground);

    this.scoreboard = this.add.text(0, 0, `${this.score}`, {
      font: "900 1rem sans-serif",
      color: "#fff",
    });
    this.align.scaleToGameH(this.scoreboard, 0.04);
    this.aGrid.placeAt(5, 0.5, this.scoreboard);
    this.scoreboard.depth = 12;

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
    const frameCount = this.game.getFrame();
    if (frameCount % 120 === 0) {
      this.pipes.push(new Pipe(this, "pipe"));
    }
    for (const pipe of this.pipes) {
      pipe.update();
      this.bird.bird.setOnCollideWith(pipe.sensor, () => {
        this.score += 1;
        this.scoreboard.setText(`${this.score}`);
      });
      this.bird.bird.setOnCollideWith(pipe.pipeTop, () => {
        this.game.input.enabled = false;
        this.scene.launch("game-over");
      });
      this.bird.bird.setOnCollideWith(pipe.pipeBottom, () => {
        this.game.input.enabled = false;
        this.scene.launch("game-over");
      });
      this.bird.bird.setOnCollideWith(this.ground, () => {
        this.game.input.enabled = false;
        this.scene.launch("game-over");
      });
    }
    const fps = this.game.loop.actualFps.toFixed(0);
    this.fps.setText(`FPS: ${fps}`);
  }
}
