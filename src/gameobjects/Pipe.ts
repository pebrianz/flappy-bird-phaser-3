import { BodyType } from "matter";
import Phaser from "phaser";
import GameScene from "../scenes/GameScene";

export default class Pipe {
  private readonly scene: GameScene;
  readonly posYTop: number;
  readonly space: number;
  readonly posYBottom: number;
  readonly pipeTop: Phaser.Physics.Matter.Sprite;
  readonly pipeBottom: Phaser.Physics.Matter.Sprite;
  readonly sensor: MatterJS.BodyType;
  constructor(scene: GameScene, texture: string) {
    this.scene = scene;
    const options = {
      isStatic: true,
    };
    this.posYTop = Math.random() * 6;
    this.space = 2;
    this.posYBottom = this.posYTop + this.space;

    this.pipeTop = this.scene.matter.add.sprite(0, 0, texture, 0, options);
    this.pipeBottom = this.scene.matter.add.sprite(0, 0, texture, 0, options);

    this.scene.align.scaleToGameH(this.pipeTop, 0.8);
    this.scene.align.scaleToGameH(this.pipeBottom, 0.8);

    this.scene.aGrid.placeAtOriginBottom(12, this.posYTop, this.pipeTop);
    this.scene.aGrid.placeAtOriginTop(12, this.posYBottom, this.pipeBottom);

    this.sensor = this.scene.matter.add.rectangle(
      0,
      0,
      this.pipeTop.width,
      this.scene.aGrid.height(this.space),
      {
        isSensor: true,
        isStatic: true,
      }
    );

    this.scene.aGrid.placeAtOriginTops(
      this.scene,
      12,
      this.posYTop,
      this.sensor
    );
    this.scene.align.scaleToGameH(this.sensor, 0.8);
  }
  update() {
    this.scene.matter.body.translate(this.pipeTop.body as BodyType, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
    this.scene.matter.body.translate(this.pipeBottom.body as BodyType, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
    this.scene.matter.body.translate(this.sensor, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
  }
}
