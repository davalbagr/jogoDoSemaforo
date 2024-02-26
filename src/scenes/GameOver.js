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
        .text(612, 300, "You Won!", {
          fontFamily: "Arial Black",
          fontSize: 64,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
        .setOrigin(0.5);
    } else {
      this.add
        .text(612, 300, "You Lost", {
          fontFamily: "Arial Black",
          fontSize: 64,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        })
        .setOrigin(0.5);
    }

    const restart = this.add
      .text(580, 380, "Restart", {
        fontFamily: "Arial Black",
        fontSize: 16,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setInteractive();

    restart.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
