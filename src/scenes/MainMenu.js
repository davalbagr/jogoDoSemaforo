import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(660, 384, "background");
    var difficulty = 3;
    const logo = this.add.image(180, 125, "logo");
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

    const pvp = this.add.image(700, 320, "pvp").setInteractive();
    pvp.scale *= 0.9;
    const pve = this.add.image(700, 530, "pve").setInteractive();
    pve.scale *= 0.9;
    const login = this.add.image(1180, 130, "login").setInteractive();
    login.scale *= 0.7;
    const leaderboard = this.add
      .image(1180, 390, "leaderboard")
      .setInteractive();
    const info = this.add.image(1180, 510, "info").setInteractive();
    const creditos = this.add.image(1180, 630, "creditos").setInteractive();
    info.scale *= 0.8;
    creditos.scale *= 0.8;
    leaderboard.scale *= 0.8;
    this.add.image(80, 600, "semaforo");
    const easy = this.add.image(930, 440, "easy").setInteractive();
    const medium = this.add.image(930, 530, "medium").setInteractive();
    const hard = this.add.image(930, 620, "hard").setInteractive();
    easy.scale *= 0.7;
    medium.scale = 0.6;
    hard.scale *= 0.44;
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
      this.scene.start("Singleplayer", { difficulty: difficulty });
    });
    easy.on("pointerdown", () => {
      if (difficulty == 6) {
        medium.scale /= 1.2;
        easy.scale *= 1.2;
      } else if (difficulty == 8) {
        hard.scale /= 1.2;
        easy.scale *= 1.2;
      }
      difficulty = 2;
    });
    medium.on("pointerdown", () => {
      if (difficulty == 3) {
        easy.scale /= 1.2;
        medium.scale *= 1.2;
      } else if (difficulty == 8) {
        hard.scale /= 1.2;
        medium.scale *= 1.2;
      }
      difficulty = 4;
    });
    hard.on("pointerdown", () => {
      if (difficulty == 3) {
        easy.scale /= 1.2;
        hard.scale *= 1.2;
      } else if (difficulty == 6) {
        medium.scale /= 1.2;
        hard.scale *= 1.2;
      }
      difficulty = 8;
    });
  }
}
