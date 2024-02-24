import { Scene } from "phaser";

export class Leaderboard extends Scene {
  constructor() {
    super("Leaderboard");
  }

  create() {
    this.load.image(512, 200, "logo");

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
