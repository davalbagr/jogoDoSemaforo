import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(512, 384, "background");

    this.add.image(512, 200, "logo");

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

    const pvp = this.add.image(500, 360, "pvp").setInteractive();
    const pve = this.add.image(500, 480, "pve").setInteractive();
    const fullscreen = this.add.image(950, 460, "fullscreen").setInteractive();
    const leaderboard = this.add
      .image(950, 540, "leaderboard")
      .setInteractive();
    const info = this.add.image(950, 620, "info").setInteractive();
    const creditos = this.add.image(950, 700, "creditos").setInteractive();

    fullscreen.addListener("pointerdown", () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
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
    pve.once("pointerdown", () => {
      this.scene.start("Difficulty");
    });
  }
}
