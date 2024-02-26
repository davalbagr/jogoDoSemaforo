import { Scene } from "phaser";

export class Leaderboard extends Scene {
  constructor() {
    super("Leaderboard");
  }

  create() {
    this.add.image(660, 384, "background");
    this.add.image(272, 160, "logo");
    const home = this.add.image(150, 600, "home").setInteractive();
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
