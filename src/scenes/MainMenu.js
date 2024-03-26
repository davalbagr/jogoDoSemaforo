import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const easyDif = 1;
    const mediumDif = 4;
    const hardDif = 6;
    // +340 +116
    const background = this.add.image(1000, 500, "background");
    background.scale = 1.28;
    let difficulty = easyDif;
    const logo = this.add.image(422, 180, "logo");
    const pvp = this.add.image(1040, 436, "pvp").setInteractive();
    const pve = this.add.image(1040, 646, "pve").setInteractive();
    const login = this.add.image(1670, 166, "login").setInteractive();
    const leaderboard = this.add
      .image(1670, 550, "leaderboard")
      .setInteractive();
    const info = this.add.image(1670, 690, "info").setInteractive();
    const creditos = this.add.image(1670, 830, "creditos").setInteractive();
    const semaforo = this.add.image(250, 790, "semaforo");
    semaforo.scale = 1.2;
    const easy = this.add.image(1300, 556, "easy").setInteractive();
    const medium = this.add.image(1300, 646, "medium").setInteractive();
    const hard = this.add.image(1300, 736, "hard").setInteractive();
    easy.scale = 0.7;
    medium.scale = 0.7;
    hard.scale = 0.5;
    login.on("pointerdown", () => {});
    leaderboard.once("pointerdown", () => {
      this.scene.start("Leaderboard");
    });
    info.once("pointerdown", () => {
      this.scene.start("Info");
    });
    creditos.once("pointerdown", () => {
      this.scene.start("Creditos");
    });
    pvp.once("pointerdown", () => {
      this.scene.start("Multiplayer");
    });
    pve.once("pointerdown", () => {
      this.scene.start("Singleplayer", { difficulty: difficulty, easyDif: easyDif, mediumDif: mediumDif });
    });
    easy.on("pointerdown", () => {
      if (difficulty === mediumDif) {
        medium.scale /= 1.2;
        easy.scale *= 1.3;
      } else if (difficulty === hardDif) {
        hard.scale /= 1.2;
        easy.scale *= 1.3;
      }
      difficulty = easyDif;
    });
    medium.on("pointerdown", () => {
      if (difficulty === easyDif) {
        easy.scale /= 1.3;
        medium.scale *= 1.2;
      } else if (difficulty === hardDif) {
        hard.scale /= 1.2;
        medium.scale *= 1.2;
      }
      difficulty = mediumDif;
    });
    hard.on("pointerdown", () => {
      if (difficulty === easyDif) {
        easy.scale /= 1.3;
        hard.scale *= 1.2;
      } else if (difficulty === mediumDif) {
        medium.scale /= 1.2;
        hard.scale *= 1.2;
      }
      difficulty = hardDif;
    });
  }
}
