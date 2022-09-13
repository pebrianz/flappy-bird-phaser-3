import Phaser from "phaser";

export default class Bird {
  scene: Phaser.Scene | any;
  bird: Phaser.Physics.Matter.Sprite;
  constructor(scene: Phaser.Scene | any, texture: any) {
    this.scene = scene;
    const { birddownflap, birdmidflap, birdupflap } = texture;
    this.bird = scene.matter.add.sprite(0, 0, birddownflap, 0);
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
    this.scene.matter.body.setVelocity(this.bird.body, {
      x: 0,
      y: (innerHeight * -1.2) / 100,
    });
    this.bird.play("fly");
  }
  offscreen() {
    if (this.bird.x < -this.bird.width * 6) {
      return true;
    }
    if (this.bird.x > innerWidth + this.bird.width * 6) {
      return true;
    }
    if (this.bird.y > innerHeight + this.bird.height * 10) {
      return true;
    }
    return false;
  }
  reset() {
    this.scene.aGrid.placeAt(4, 0, this.bird);
  }
}
