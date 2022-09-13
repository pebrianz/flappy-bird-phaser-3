import Phaser from "phaser";
import GameScene, { GameStart } from "./GameScene";
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
      //      debug: true,
    },
  },
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [GameScene, GameStart],
};

export default new Phaser.Game(config);
