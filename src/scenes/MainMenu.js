import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const easyDif = 1;
    const mediumDif = 4;
    const hardDif = 6;
    const background = this.add.image(1000-47, 500, "background");
    background.scale = 1.28;
    let difficulty = easyDif;
    const logo = this.add.image(422-47, 180, "logo");
    const pvp = this.add.image(1040-47, 436, "pvp").setInteractive({ useHandCursor: true });
    const pve = this.add.image(1040-47, 646, "pve");
    const login = this.add.image(1670-47, 166, "login").setInteractive({ useHandCursor: true });
    const leaderboard = this.add
      .image(1670-47, 550, "leaderboard")
      .setInteractive({ useHandCursor: true });
    const info = this.add.image(1670-47, 690, "info").setInteractive({ useHandCursor: true });
    const creditos = this.add.image(1670-47, 830, "creditos").setInteractive({ useHandCursor: true });
    const semaforo = this.add.image(250-47, 790, "semaforo");
    semaforo.scale = 1.2;
    const easy = this.add.image(1300-47, 556, "easy").setInteractive({ useHandCursor: true });
    const medium = this.add.image(1300-47, 646, "medium").setInteractive({ useHandCursor: true });
    const hard = this.add.image(1300-47, 736, "hard").setInteractive({ useHandCursor: true });
    easy.scale = 0.73;
    medium.scale = 0.7;
    hard.scale = 0.5;
    login.on("pointerdown", () => {
      this.scene.start("Login");
    });
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
    easy.on("pointerdown", () => {
      this.scene.start("Singleplayer", { difficulty: easyDif, easyDif: easyDif, mediumDif: mediumDif });
    });
    medium.on("pointerdown", () => {
      this.scene.start("Singleplayer", { difficulty: mediumDif, easyDif: easyDif, mediumDif: mediumDif });
    });
    hard.on("pointerdown", () => {
      this.scene.start("Singleplayer", { difficulty: hardDif, easyDif: easyDif, mediumDif: mediumDif });
    });
  }
}
