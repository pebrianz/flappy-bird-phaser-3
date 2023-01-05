import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";
import Pipe from "./Pipe";

export default class Obstacle {
  pipeTop: Pipe;
  pipeBottom: Pipe;
  posPipeTop = 0;
  posPipeBottom = 0;
  sensor: BodyType;
  sensorHeight = 0;
  space = 175;
  speed = 4;
  constructor(public scene: GameScene, public texture: string) {
    const options: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      isStatic: true,
    };
    this.posPipeTop = Math.floor(
      Math.random() * (scene.bg.displayHeight - 300)
    );
    this.posPipeBottom = this.posPipeTop + this.space;

    this.pipeTop = new Pipe(scene, 0, 0, texture, options);
    this.pipeTop.setScale(2, 2);
    this.pipeTop.placeAtWithOriginBottom(scene.gameWidth, this.posPipeTop);

    this.pipeBottom = new Pipe(scene, 0, 0, texture, options);
    this.pipeBottom.setScale(2, 2);
    this.pipeBottom.placeAtWithOriginTop(scene.gameWidth, this.posPipeBottom);

    this.sensor = scene.matter.add.rectangle(0, 0, 10, this.space, {
      isStatic: true,
      isSensor: true,
    });
    scene.matter.body.setPosition(this.sensor, {
      x: this.pipeTop.x,
      y: this.posPipeTop + this.space / 2,
    });
  }
  update() {
    this.pipeTop.update(this.speed);
    this.pipeBottom.update(this.speed);

    this.scene.matter.body.translate(this.sensor, {
      x: -this.speed,
      y: 0,
    });
  }
}
