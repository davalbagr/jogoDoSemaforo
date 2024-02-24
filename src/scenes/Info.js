import { Scene } from "phaser";

export class Info extends Scene {
  constructor() {
    super("Info");
  }

  create() {
    this.load.image(512, 200, "logo");

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
