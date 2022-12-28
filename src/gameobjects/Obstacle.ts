import { BodyType } from "matter";
import Phaser from "phaser";

import GameScene from "../scenes/GameScene";
import Pipe from "./Pipe";

export default class Obstacle {
  pipeTop: Pipe;
  pipeBottom: Pipe;
  sensor: BodyType;
  sensorHeight = 0;
  space = 2;
  speed = 8;
  yy = Math.random() * 6;
  constructor(public scene: GameScene, public texture: string) {
    const options: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      isStatic: true,
    };
    this.pipeTop = new Pipe(scene, scene.matter.world, texture, options);
    this.pipeTop.scaleToGameHeight(0.8);
    scene.aGrid.placeAtByOriginBottom(12, this.yy, this.pipeTop);

    this.pipeBottom = new Pipe(scene, scene.matter.world, texture, options);
    this.pipeBottom.scaleToGameHeight(0.8);
    scene.aGrid.placeAtByOriginTop(12, this.yy + this.space, this.pipeBottom);

    this.sensorHeight = scene.aGrid.height(this.space);
    this.sensor = scene.matter.add.rectangle(
      0,
      0,
      this.pipeTop.width,
      this.sensorHeight,
      {
        isStatic: true,
        isSensor: true,
      }
    );
    scene.aGrid.placeBodyAt(scene, 12, this.yy + 1, this.sensor);
  }
  update() {
    this.pipeTop.update(this.speed);
    this.pipeBottom.update(this.speed);

    this.scene.matter.body.translate(this.sensor, {
      x: (this.scene.gameWidth / 1000) * -this.speed,
      y: 0,
    });
  }
}
