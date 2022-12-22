import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import GameStart from "./scenes/GameStart";
import GameOver from "./scenes/GameOver";
import "./style.css";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  pixelArt: true,
  backgroundColor: "#33A5E7",
  physics: {
    default: "matter",
    matter: {
      gravity: {
        y: (innerHeight * 0.16) / 100,
      },
      // debug: true,
    },
  },
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [GameScene, GameStart, GameOver],
};

export default new Phaser.Game(config);
