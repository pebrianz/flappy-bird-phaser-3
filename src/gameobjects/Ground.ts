import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";

export default class Ground {
  public body: BodyType;
  public sprite: Phaser.GameObjects.TileSprite;
  constructor(
    public scene: GameScene,
    public x: number,
    public y: number,
    public texture: string
  ) {
    this.sprite = this.scene.add.tileSprite(x, y, 0, 0, texture);
    this.sprite.setOrigin(0.5, 0);
    this.sprite.scale = 1;
    this.body = this.scene.matter.add.rectangle(
      this.sprite.x,
      this.sprite.y + this.sprite.displayHeight / 2,
      this.sprite.displayWidth,
      this.sprite.displayHeight,
      {
        isStatic: true,
      }
    );
  }
}
