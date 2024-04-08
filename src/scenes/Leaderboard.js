import { Scene } from "phaser";

export class Leaderboard extends Scene {
  constructor() {
    super("Leaderboard");
  }

  create() {
    const background = this.add.image(1000-47, 500, "background");
    background.scale = 1.28;
    const logo = this.add.image(422-47, 180, "logo");
    const home = this.add.image(310-47, 800, "home").setInteractive({ useHandCursor: true });
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
