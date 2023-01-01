import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";

export default class Pipe extends Phaser.Physics.Matter.Sprite {
  constructor(
    public scene: GameScene,
    public world: Phaser.Physics.Matter.World,
    public texture: any,
    public options?: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    super(world, 0, 0, texture, 0, options);
    scene.add.existing(this);
  }
  scaleToGameHeight(per: number) {
    this.displayHeight = this.scene.gameHeight * per;
    this.displayWidth = this.scene.gameWidth * 0.14;
  }
  update(speed: number) {
    this.scene.matter.body.translate(this.body as BodyType, {
      x: (innerWidth / 1000) * -speed,
      y: 0,
    });
  }
}
