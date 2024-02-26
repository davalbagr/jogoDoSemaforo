import { Scene } from "phaser";

export class Singleplayer extends Scene {
  constructor() {
    super("Singleplayer");
  }

  init(data) {
    this.difficulty = data.difficulty;
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
    const plcomputer = this.add.image(1180, 400, "plcomputer");
    plcomputer.scale *= 0.85;
    const pve = this.add.image(170, 270, "pve");
    pve.scale *= 0.5;
    var difficulty;
    if (this.difficulty == 3) {
      difficulty = this.add.image(250, 290, "easy");
    } else if (this.difficulty == 6) {
      difficulty = this.add.image(250, 290, "medium");
    } else {
      difficulty = this.add.image(250, 290, "hard");
    }
    difficulty.scale *= 0.3;

    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
