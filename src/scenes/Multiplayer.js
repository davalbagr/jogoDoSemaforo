import { Scene } from "phaser";

export class Multiplayer extends Scene {
  constructor() {
    super("Multiplayer");
  }

  create() {
    this.load.image(512, 200, "logo");
    const restart = this.add.image(950, 700, "restart").setInteractive();
    restart.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
