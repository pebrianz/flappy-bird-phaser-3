import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";

export type FramesKey = {
  birdupflap: string;
  birdmidflap: string;
  birddownflap: string;
};

export default class Bird extends Phaser.Physics.Matter.Sprite {
  public inertia = 0;
  constructor(
    public scene: GameScene,
    public x: number,
    public y: number,
    public texture: any,
    public framesKey: FramesKey,
    public options?: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    super(scene.matter.world, x, y, texture, 0, options);
    const { birdupflap, birdmidflap, birddownflap } = framesKey;

    this.setBody({
      type: "circle",
      radius: 12,
    });

    const body = this.body as BodyType;
    this.inertia = body.inertia;

    const frames = [
      { key: birdupflap },
      { key: birdmidflap },
      { key: birddownflap },
      { key: birdmidflap },
      { key: birdupflap },
    ];

    scene.anims.create({
      key: "fly",
      frames,
      frameRate: 8,
      repeat: 0,
    });
    scene.add.existing(this);
  }
  fly() {
    this.scene.matter.body.setVelocity(this.body as BodyType, {
      x: 0,
      y: -10,
    });
    this.play("fly");
  }
}
