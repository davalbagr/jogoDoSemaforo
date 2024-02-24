import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);

    this.add.image(512, 384, "background").setAlpha(0.5);

    this.add
      .text(512, 300, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    const restart = this.add
      .text(480, 380, "Restart", {
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
