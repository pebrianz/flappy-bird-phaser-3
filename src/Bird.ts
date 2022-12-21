import { BodyType } from "matter";
import Phaser from "phaser";
import GameScene from "./GameScene";

export default class Bird {
  scene: GameScene;
  bird: Phaser.Physics.Matter.Sprite;
  constructor(scene: GameScene, texture: any) {
    this.scene = scene;

    const { birddownflap, birdmidflap, birdupflap } = texture;

    this.bird = scene.matter.add.sprite(0, 0, birdupflap, 0);
    this.bird.setBody({
      type: "circle",
      radius: 10,
    });

    this.bird.setFixedRotation();

    scene.align.scaleToGameH(this.bird, 0.045);
    scene.aGrid.placeAt(2, 2, this.bird);

    scene.anims.create({
      key: "fly",
      frames: [
        { key: birdupflap },
        { key: birdmidflap },
        { key: birddownflap },
        { key: birdmidflap },
        { key: birdupflap },
      ],
      frameRate: 8,
      repeat: 0,
    });
  }
  fly() {
    this.scene.matter.body.setVelocity(this.bird.body as BodyType, {
      x: 0,
      y: (innerHeight * -1.2) / 100,
    });
    this.bird.play("fly");
  }
}
