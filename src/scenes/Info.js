import { Scene } from "phaser";

export class Info extends Scene {
  constructor() {
    super("Info");
  }

  create() {
    const background = this.add.image(1000, 500, "background");
    background.scale = 1.28;
    const logo = this.add.image(422, 180, "logo");
    const home = this.add.image(310, 800, "home").setInteractive();
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
