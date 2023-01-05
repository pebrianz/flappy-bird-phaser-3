import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";

export default class Pipe extends Phaser.Physics.Matter.Sprite {
  constructor(
    public scene: GameScene,
    public x: number,
    public y: number,
    public texture: any,
    public options?: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    super(scene.matter.world, x, y, texture, 0, options);
    scene.add.existing(this);
  }
  placeAtWithOriginBottom(x: number, y: number) {
    this.setX(x + this.displayWidth);
    this.setY(y - this.displayHeight / 2);
  }
  placeAtWithOriginTop(x: number, y: number) {
    this.setX(x + this.displayWidth);
    this.setY(y + this.displayHeight / 2);
  }
  update(speed: number) {
    this.scene.matter.body.translate(this.body as BodyType, {
      x: -speed,
      y: 0,
    });
  }
}
