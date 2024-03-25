import { Scene } from "phaser";

export class Info extends Scene {
  constructor() {
    super("Info");
  }

  create() {
    this.add.image(660+340, 384+116, "background");
    const logo = this.add.image(526, 241, "logo");
    logo.scale *= 0.7;
    const home = this.add.image(120+340, 620+116, "home").setInteractive();
    home.scale *= 0.7;
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
