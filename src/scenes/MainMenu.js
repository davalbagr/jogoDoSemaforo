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
    this.add.image(1000, 500, "background");
    var difficulty = easyDif;
    const logo = this.add.image(526, 241, "logo");
    logo.scale *= 0.7;

    // this.add
    //   .text(512, 260, "Main Menu", {
    //     fontFamily: "Arial Black",
    //     fontSize: 38,
    //     color: "#ffffff",
    //     stroke: "#000000",
    //     strokeThickness: 8,
    //     align: "center",
    //   })
    //   .setOrigin(0.5);

    const pvp = this.add.image(1040, 436, "pvp").setInteractive();
    pvp.scale *= 0.9;
    const pve = this.add.image(1040, 646, "pve").setInteractive();
    pve.scale *= 0.9;
    const login = this.add.image(1520, 246, "login").setInteractive();
    login.scale *= 0.7;
    const leaderboard = this.add
      .image(1520, 506, "leaderboard")
      .setInteractive();
    const info = this.add.image(1520, 626, "info").setInteractive();
    const creditos = this.add.image(1520, 746, "creditos").setInteractive();
    info.scale *= 0.8;
    creditos.scale *= 0.8;
    leaderboard.scale *= 0.8;
    this.add.image(420, 716, "semaforo");
    const easy = this.add.image(1270, 556, "easy").setInteractive();
    const medium = this.add.image(1270, 646, "medium").setInteractive();
    const hard = this.add.image(1270, 736, "hard").setInteractive();
    easy.scale *= 0.65;
    medium.scale *= 0.65;
    hard.scale *= 0.45;
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
