import { Scene } from "phaser";

export class Difficulty extends Scene {
  constructor() {
    super("Difficulty");
  }

  create() {
    this.add.image(512, 200, "logo");
    const easy = this.add.image(350, 380, "easyButton").setInteractive();
    const medium = this.add.image(500, 380, "mediumButton").setInteractive();
    const hard = this.add.image(650, 380, "hardButton").setInteractive();
    const restart = this.add.image(950, 700, "restart").setInteractive();
    // this.add
    //   .text(
    //     512,
    //     384,
    //     "Make something fun!\nand share it with us:\nsupport@phaser.io",
    //     {
    //       fontFamily: "Arial Black",
    //       fontSize: 38,
    //       color: "#ffffff",
    //       stroke: "#000000",
    //       strokeThickness: 8,
    //       align: "center",
    //     },
    //   )
    //   .setOrigin(0.5);

    easy.once("pointerdown", () => {
      this.scene.start("Singleplayer");
    });
    medium.once("pointerdown", () => {
      this.scene.start("Singleplayer");
    });
    hard.once("pointerdown", () => {
      this.scene.start("Singleplayer");
    });
    restart.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
