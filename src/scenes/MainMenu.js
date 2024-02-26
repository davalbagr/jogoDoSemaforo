import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(660, 384, "background");

    this.add.image(272, 160, "logo");

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

    const pvp = this.add.image(700, 360, "pvp").setInteractive();
    const pve = this.add.image(700, 530, "pve").setInteractive();
    const login = this.add.image(1150, 150, "login").setInteractive();
    const leaderboard = this.add
      .image(1180, 350, "leaderboard")
      .setInteractive();
    const info = this.add.image(1180, 480, "info").setInteractive();
    const creditos = this.add.image(1180, 610, "creditos").setInteractive();
    this.add.image(80, 600, "semaforo");

    login.addListener("pointerdown", () => {});
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
      this.scene.start("Singleplayer");
    });
  }
}
