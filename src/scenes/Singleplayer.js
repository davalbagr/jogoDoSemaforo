import { Scene } from "phaser";

export class Singleplayer extends Scene {
  constructor() {
    super("Singleplayer");
  }

  create() {
    this.load.image(512, 200, "logo");
    const restart = this.add.image(950, 700, "restart").setInteractive();

    restart.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
