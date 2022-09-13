import Phaser from "phaser";

export default class Pipe {
  scene: Phaser.Scene | any;
  posYTop: number;
  space: number;
  posYBottom;
  pipeTop: Phaser.Physics.Matter.Sprite | any;
  pipeBottom: Phaser.Physics.Matter.Sprite | any;
  sensor: Phaser.Physics.Matter.Factory | any;
  constructor(scene: Phaser.Scene, texture: string) {
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
    this.scene.matter.body.translate(this.pipeTop.body, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
    this.scene.matter.body.translate(this.pipeBottom.body, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
    this.scene.matter.body.translate(this.sensor, {
      x: (innerWidth * -0.8) / 100,
      y: 0,
    });
  }
}
