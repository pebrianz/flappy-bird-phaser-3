import Phaser from "phaser";

export default class Align {
  public readonly gameWidth: number;
  public readonly gameHeight: number;
  constructor(private readonly scene: Phaser.Scene) {
    this.gameWidth = this.scene.game.config.width as number;
    this.gameHeight = this.scene.game.config.height as number;
  }
  scaleToGameWidth(obj: any, per: number) {
    obj.displayWidth = this.gameWidth * per;
    obj.scaleY = obj.scaleX;
  }
  scaleToGameHeight(obj: any, per: number) {
    obj.displayHeight = this.gameHeight * per;
    obj.scaleX = obj.scaleY;
  }
  center(obj: any) {
    obj.x = this.gameWidth / 2;
    obj.y = this.gameHeight / 2;
  }
}
