import { Scene } from "phaser";
import * as Backend from "../lib/backEndconnector.js";
import {getTOP, infoUser} from "../lib/backEndconnector.js";

var x;
var y;
var nome;
var nome2;
var cred = false;
var info = false;
var d = new Date();
var m = d.getMonth();
var n = d.getFullYear();
var timeoutMenu;
if (m > 7) {
  var x = n;
  var y = n +1;
}
else {
  var x = n - 1;
  var y = n;
}
let di = x + "-09-01";
let df = y + "-08-31";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  update(time, delta) {
    if (this.scale.isFullscreen) {
      this.fullscreen2.setVisible(true);
      this.fullscreen2.setInteractive({ useHandCursor: true });
      this.fullscreen.setVisible(false);
      this.fullscreen.disableInteractive();
    } else {
      this.fullscreen2.setVisible(false);
      this.fullscreen2.disableInteractive();
      this.fullscreen.setVisible(true);
      this.fullscreen.setInteractive({ useHandCursor: true });
    }
    if (Backend.infoUser.user !== '') {
      if (this.login.visible) {
        this.closeForm.emit("pointerdown");
      }
      this.login.setVisible(false);
      this.login.setVisible(false);
      this.logout.setVisible(true);
      this.logout.setInteractive({ useHandCursor: true });
      this.login.disableInteractive();
      if (this.greeting === undefined) {
        this.greeting = this.add.text(1600, 335, "Olá " + Backend.infoUser.firstName.split(" ")[0], {
          fontFamily: "font1",
          fontSize: 15,
        });
        this.greeting.scale = 2.0;
      }
    } else {
      this.login.setVisible(true);
      this.logout.setVisible(false);
      this.logout.disableInteractive();
      this.login.setInteractive({ useHandCursor: true });
      Backend.infoUser.getLocalData();
      if (this.greeting !== undefined) {
        this.greeting.destroy();
        this.greeting = undefined;
      }
    }
  }

  create() {
    this.greeting = undefined;
    const bugfix = this.add.text(5000, 5000, "", {
      fontFamily: "font1"
    });
    bugfix.destroy();
    const easyDif = 1;
    const mediumDif = 4;
    const hardDif = 6;
    const background = this.add.image(1000 - 30, 540, "background");
    background.scale = 1.35;
    let difficulty = easyDif;
    const logo = this.add.image(318, 180, "logo");
    logo.scale = 0.9;
    const pvp = this.add.image(1040-47, 550, "pvp").setInteractive({ useHandCursor: true });
    pvp.scale = 1.1;
    const pve = this.add.image(1040-47, 750, "pve");
    pve.scale = 1.1;
    this.login = this.add.image(1670, 200, "login");
    this.login.setVisible(false);
    this.logout = this.add.image(1670, 200, "logout");
    this.logout.setVisible(false);
    const leaderboard = this.add
      .image(1680, 610, "leaderboard")
      .setInteractive({ useHandCursor: true });
    const info = this.add.image(1680, 750, "info").setInteractive({ useHandCursor: true });
    const creditos = this.add.image(1680, 890, "creditos").setInteractive({ useHandCursor: true });
    this.fullscreen = this.add.image(1680, 460, "fullscreen");
    this.fullscreen.setVisible(false);
    this.fullscreen2 = this.add.image(1680, 460, "fullscreen2");
    this.fullscreen2.setVisible(false);
    this.fullscreen.scale = 0.7;
    this.fullscreen2.scale = 0.7;
    const semaforo = this.add.image(250-47, 850, "semaforo");
    semaforo.scale = 1.2;
    const easy = this.add.image(1300-30, 656, "easy").setInteractive({ useHandCursor: true });
    const medium = this.add.image(1300-30, 756, "medium").setInteractive({ useHandCursor: true });
    const hard = this.add.image(1300-30, 848, "hard").setInteractive({ useHandCursor: true });
    easy.scale = 0.73;
    medium.scale = 0.7;
    hard.scale = 0.5;
    const monstro = this.add.image(500, 500, "monstro");
    monstro.scale = 0.8;

    const loginForm = this.add.image(1030, 600, "login2");
    loginForm.scale = 1.35;
    loginForm.setVisible(false);

    const ok = this.add.image(1030, 810, "btok");
    ok.scale = 0.7;
    ok.setVisible(false);

    const infoForm = this.add.image(1030, 600, "info2");
    infoForm.scale = 1.3;
    infoForm.setVisible(false);

    const creditosForm = this.add.image(1130, 600, "creditos2");
    creditosForm.scale = 1.3;
    creditosForm.setVisible(false);

    const closeForm = this.add.image(1310, 320, "btnotok").setInteractive({ useHandCursor: true });
    this.closeForm = closeForm;
    closeForm.scale = 0.6;
    closeForm.setVisible(false);

    this.fullscreen.on("pointerdown", () => {
      this.scale.toggleFullscreen();
    });

    this.fullscreen2.on("pointerdown", () => {
      this.scale.toggleFullscreen();
    });

    let user = `<input type="text" name="username" style="font-size: 15px; font-family:'font1'; text-align:center;">`;
    let pass = `<input type="password" name="password" style="font-size: 15px; font-family:'font1'; text-align:center;">`;

    ok.on("pointerdown", () => {
      let uTxt = this.usernameField.getChildByName("username").value
      let pTxt = this.passwordField.getChildByName("password").value
      if (uTxt !== '' && pTxt !== '') {
        Backend.login(uTxt, pTxt, this);
      }
    });

    closeForm.on("pointerdown", () => {
      infoForm.setVisible(false);
      loginForm.setVisible(false);
      creditosForm.setVisible(false);
      ok.setVisible(false);
      ok.disableInteractive();
      pvp.setInteractive({ useHandCursor: true });
      easy.setInteractive({ useHandCursor: true });
      medium.setInteractive({ useHandCursor: true });
      hard.setInteractive({ useHandCursor: true });
      creditos.setInteractive({ useHandCursor: true });
      info.setInteractive({ useHandCursor: true });
      this.login.setInteractive({ useHandCursor: true });
      closeForm.setVisible(false);
      if (this.usernameField !== undefined) {
        this.usernameField.destroy();
        this.passwordField.destroy();
        this.usernameField = undefined;
        this.passwordField = undefined;
      }
    })
    this.login.on("pointerdown", () => {
      closeForm.emit("pointerdown");
      loginForm.setVisible(true);
      closeForm.setVisible(true);
      ok.setVisible(true);
      ok.setInteractive({ useHandCursor: true });
      pvp.disableInteractive();
      easy.disableInteractive();
      medium.disableInteractive();
      hard.disableInteractive();
      this.usernameField = this.add.dom(1080, 500).createFromHTML(user);
      this.usernameField.scale = 1.7;
      this.passwordField = this.add.dom(1080, 670).createFromHTML(pass);
      this.passwordField.scale = 1.7;
      this.login.disableInteractive();
    });
    this.logout.on("pointerdown", () => {
      infoUser.logout();
    })
    leaderboard.on("pointerdown", () => {
      getTOP(di, df, "", "", 1, this);
    });
    info.on("pointerdown", () => {
      closeForm.emit("pointerdown");
      infoForm.setVisible(true);
      closeForm.setVisible(true);
      pvp.disableInteractive();
      easy.disableInteractive();
      medium.disableInteractive();
      hard.disableInteractive();
      info.disableInteractive();
    });
    creditos.on("pointerdown", () => {
      closeForm.emit("pointerdown");
      infoForm.setVisible(true);
      closeForm.setVisible(true);
      pvp.disableInteractive();
      easy.disableInteractive();
      medium.disableInteractive();
      hard.disableInteractive();
      creditos.disableInteractive();
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
