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
    if (Backend.infoUser.user !== '') {
      if (this.greeting === undefined) {
        this.greeting = this.add.text(850, 120, "Olá " + Backend.infoUser.firstName.split(" ")[0], {
          fontFamily: "font1",
          fontSize: 20,
        });
        this.greeting.scale = 2.0;
      }
    } else {
      Backend.infoUser.getLocalData();
      if (this.greeting !== undefined) {
        this.greeting.destroy();
        this.greeting = undefined;
      }
    }
  }

  create() {
    this.greeting = undefined;
    const easyDif = 1;
    const mediumDif = 4;
    const hardDif = 6;
    const background = this.add.image(1000-47, 500, "background");
    background.scale = 1.28;
    let difficulty = easyDif;
    const logo = this.add.image(422-74, 180, "logo");
    logo.scale = 0.9;
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
    const monstro = this.add.image(500, 500, "monstro");
    monstro.scale = 0.8;

    const loginForm = this.add.image(1050, 500, "login2");
    loginForm.scale = 1.35;
    loginForm.setVisible(false);

    const ok = this.add.image(1050, 700, "btok");
    ok.scale = 0.7;
    ok.setVisible(false);

    const infoForm = this.add.image(1050, 500, "creditos2");
    infoForm.scale = 1.3;
    infoForm.setVisible(false);

    const creditosForm = this.add.image(1050, 500, "creditos2");
    creditosForm.scale = 1.3;
    creditosForm.setVisible(false);

    const closeForm = this.add.image(1330, 220, "btnotok").setInteractive({ useHandCursor: true });
    closeForm.scale = 0.6;
    closeForm.setVisible(false);

    let user = `<input type="text" name="username" style="font-size: 15px; font-family:'font1'; text-align:center;">`;
    let pass = `<input type="password" name="password" style="font-size: 15px; font-family:'font1'; text-align:center;">`;
    var usernameField;
    var passwordField;

    ok.on("pointerdown", () => {
      let uTxt = usernameField.getChildByName("username").value
      let pTxt = passwordField.getChildByName("password").value
      if (uTxt !== '' && pTxt !== '') {
        Backend.login(uTxt, pTxt, this);
        usernameField.getChildByName("username").value = '';
        passwordField.getChildByName("password").value = '';
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
      closeForm.setVisible(false);
      if (usernameField !== undefined) {
        usernameField.destroy();
        passwordField.destroy();
        usernameField = undefined;
        passwordField = undefined;
      }
    })
    login.on("pointerdown", () => {
      loginForm.setVisible(true);
      closeForm.setVisible(true);
      ok.setVisible(true);
      ok.setInteractive({ useHandCursor: true });
      pvp.disableInteractive();
      easy.disableInteractive();
      medium.disableInteractive();
      hard.disableInteractive();
      usernameField = this.add.dom(1100, 400).createFromHTML(user);
      passwordField = this.add.dom(1100, 570).createFromHTML(pass);
    });
    leaderboard.on("pointerdown", () => {
      getTOP(di, df, "", "", 1, this);
    });
    info.on("pointerdown", () => {
      infoForm.setVisible(true);
      closeForm.setVisible(true);
      pvp.disableInteractive();
      easy.disableInteractive();
      medium.disableInteractive();
      hard.disableInteractive();
    });
    creditos.on("pointerdown", () => {
      infoForm.setVisible(true);
      closeForm.setVisible(true);
      pvp.disableInteractive();
      easy.disableInteractive();
      medium.disableInteractive();
      hard.disableInteractive();
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
