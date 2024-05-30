import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Singleplayer } from "./scenes/Singleplayer";
import { Multiplayer } from "./scenes/Multiplayer";
import { Leaderboard } from "./scenes/Leaderboard";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  fullscreenTarget: "game-container",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [
    Preloader,
    MainMenu,
    Singleplayer,
    Multiplayer,
    Leaderboard,
  ],
};

export default new Phaser.Game(config);
