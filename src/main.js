import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Singleplayer } from "./scenes/Singleplayer";
import { Multiplayer } from "./scenes/Multiplayer";
import { Creditos } from "./scenes/Creditos";
import { Info } from "./scenes/Info";
import { Leaderboard } from "./scenes/Leaderboard";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 1320,
  height: 765,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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
  ],
};

export default new Phaser.Game(config);
