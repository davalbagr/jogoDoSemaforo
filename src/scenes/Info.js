import { Scene } from "phaser";

export class Info extends Scene {
  constructor() {
    super("Info");
  }

  create() {
    this.add.image(660, 384, "background");
    const logo = this.add.sprite(180, 125, "logo");
    logo.scale *= 0.7;
    const home = this.add.image(120, 620, "home").setInteractive();
    home.scale *= 0.7;
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
