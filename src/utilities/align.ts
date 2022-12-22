import Phaser from "phaser";

export default class Align {
  private readonly width: number;
  private readonly height: number;
  constructor(private readonly scene: Phaser.Scene) {
    this.width = this.scene.game.config.width as number;
    this.height = this.scene.game.config.height as number;
  }
  scaleToGameW(obj: any, per: number) {
    obj.displayWidth = this.width * per;
    obj.scaleY = obj.scaleX;
  }
  scaleToGameH(obj: any, per: number) {
    obj.displayHeight = this.height * per;
    obj.scaleX = obj.scaleY;
  }
  centerH(obj: any) {
    obj.x = this.width / 2 - obj.displayWidth / 2;
  }
  centerV(obj: any) {
    obj.y = this.height / 2 - obj.displayHeight / 2;
  }
  center2(obj: any) {
    obj.x = this.width / 2 - obj.displayWidth / 2;
    obj.y = this.height / 2 - obj.displayHeight / 2;
  }
  center(obj: any) {
    obj.x = this.width / 2;
    obj.y = this.height / 2;
  }
}
