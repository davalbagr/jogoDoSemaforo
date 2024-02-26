import { Scene } from "phaser";

export class Singleplayer extends Scene {
  constructor() {
    super("Singleplayer");
  }

  create() {
    this.add.image(660, 384, "background");
    this.add.image(272, 160, "logo");
    const home = this.add.image(150, 600, "home").setInteractive();
    const grid = this.add.image(650, 370, "grid").setInteractive();
    this.add.image(1150, 300, "pl1");
    this.add.image(1150, 400, "plcomputer");

    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
