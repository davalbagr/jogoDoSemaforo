import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Singleplayer } from "./scenes/Singleplayer";
import { Multiplayer } from "./scenes/Multiplayer";
import { Creditos } from "./scenes/Creditos";
import { Info } from "./scenes/Info";
import { Leaderboard } from "./scenes/Leaderboard";
import {Login} from "./scenes/Login.js";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 2000,
  height: 1000,
  parent: "game-container",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.LANDSCAPE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Singleplayer,
    Multiplayer,
    GameOver,
    Leaderboard,
    Info,
    Creditos,
    Login,
  ],
};

export default new Phaser.Game(config);
