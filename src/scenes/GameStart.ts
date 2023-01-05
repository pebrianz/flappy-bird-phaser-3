import Phaser from "phaser";

export default class GameStart extends Phaser.Scene {
  gamestart!: Phaser.GameObjects.Image;
  constructor() {
    super("game-start");
  }
  create() {
    this.gamestart = this.add.image(
      innerWidth / 2,
      innerHeight / 2,
      "gamestart"
    );
    this.gamestart.scale = 1.1;
    this.input.on("pointerdown", () => {
      this.gamestart.destroy();
      this.scene.resume("game-scene");
      this.scene.stop("game-start");
    });
  }
}
