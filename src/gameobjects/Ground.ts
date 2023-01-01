import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";

export default class Ground {
  public body: BodyType;
  public sprite: Phaser.GameObjects.TileSprite;
  constructor(public scene: GameScene, public texture: string) {
    this.sprite = scene.add.tileSprite(0, 0, 0, 0, texture);

    this.body = scene.matter.add.rectangle(
      this.sprite.x,
      this.sprite.y,
      this.sprite.displayWidth,
      this.sprite.displayHeight,
      {
        isStatic: true,
      }
    );
  }
}
