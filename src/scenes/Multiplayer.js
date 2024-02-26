import { Scene } from "phaser";

export class Multiplayer extends Scene {
  constructor() {
    super("Multiplayer");
  }

  create() {
    this.add.image(660, 384, "background");
    const home = this.add.image(120, 620, "home").setInteractive();
    home.scale *= 0.7;
    const grid = this.add.sprite(700, 380, "grid");
    const logo = this.add.sprite(180, 125, "logo");
    logo.scale *= 0.7;
    const pl1 = this.add.sprite(1180, 300, "pl1");
    pl1.scale *= 0.85;
    const pl2 = this.add.sprite(1180, 400, "pl2");
    pl2.scale *= 0.85;
    const pvp = this.add.sprite(170, 270, "pvp");
    pvp.scale *= 0.5;
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
