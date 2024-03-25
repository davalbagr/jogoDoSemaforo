import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.playerWon = data.turn;
  }

  create() {
    this.add.image(660+340, 384+116, "background");
    if (this.playerWon) {
      this.add
        .text(512+340, 300+116, "You Won", {
          fontFamily: "Arial Black",
          fontSize: 64,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
    } else {
      this.add
        .text(512+340, 300+116, "You Lost", {
          fontFamily: "Arial Black",
          fontSize: 64,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
    }
      const home = this.add.image(120+340, 620+116, "home").setInteractive();
      home.scale *= 0.7;
      home.once("pointerdown", () => {
          this.scene.start("MainMenu");
      });
  }
}
