import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.playerWon = data.turn;
  }

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);
    this.add.image(660, 384, "background");
    if (this.playerWon) {
      this.add
        .text(512, 300, "You Won", {
          fontFamily: "Arial Black",
          fontSize: 64,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
    } else {
      this.add
        .text(512, 300, "You Lost", {
          fontFamily: "Arial Black",
          fontSize: 64,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
    }
      const home = this.add.image(120, 620, "home").setInteractive();
      home.scale *= 0.7;
      home.once("pointerdown", () => {
          this.scene.start("MainMenu");
      });
  }
}
