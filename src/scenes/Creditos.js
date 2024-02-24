import { Scene } from "phaser";

export class Creditos extends Scene {
  constructor() {
    super("Creditos");
  }

  create() {
    this.load.image(512, 200, "logo");

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
