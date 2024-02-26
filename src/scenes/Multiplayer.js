import { Scene } from "phaser";

export class Multiplayer extends Scene {
  constructor() {
    super("Multiplayer");
  }

  create() {
    this.add.image(660, 384, "background");
    const home = this.add.image(120, 620, "home").setInteractive();
    home.scale *= 0.7;
    const grid = this.add.image(700, 380, "grid");
    const logo = this.add.image(180, 125, "logo");
    logo.scale *= 0.7;
    const pl1 = this.add.image(1180, 300, "pl1");
    pl1.scale *= 0.85;
    const pl2 = this.add.image(1180, 400, "pl2");
    pl2.scale *= 0.85;
    const pvp = this.add.image(170, 270, "pvp");
    pvp.scale *= 0.5;
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
