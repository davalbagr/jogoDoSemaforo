import { Boot } from "./scenes/Boot";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Singleplayer } from "./scenes/Singleplayer";
import { Multiplayer } from "./scenes/Multiplayer";
import { Leaderboard } from "./scenes/Leaderboard";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 1906,
  height: 996,
  parent: "game-container",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Singleplayer,
    Multiplayer,
    Leaderboard,
  ],
};

export default new Phaser.Game(config);
