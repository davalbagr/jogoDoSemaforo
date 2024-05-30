import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");
    this.load.image("easy", "easy.png");
    this.load.image("medium", "medium.png");
    this.load.image("hard", "hard.png");
    this.load.image("creditos", "creditos.png");
    this.load.image("leaderboard", "leaderboard.png");
    this.load.image("pve", "pve.png");
    this.load.image("pvp", "pvp.png");
    this.load.image("info", "info.png");
    this.load.image("semaforo", "semaforo.png");
    this.load.image("login", "login.png");
    this.load.image("home", "home.png");
    this.load.image("grid", "grid.png");
    this.load.image("pl1", "pl1.png");
    this.load.image("plcomputer", "plcomputer.png");
    this.load.image("pl2", "pl2.png");
    this.load.image("green", "green.png");
    this.load.image("yellow", "yellow.png");
    this.load.image("red", "red.png");
    this.load.image("pl1target", "pl1target.png");
    this.load.image("pl2target", "pl2target.png");
    this.load.image("cputarget", "cputarget.png");
    this.load.image("login2", "login2.png");
    this.load.image("monstro", "monstro.png");
    this.load.image("btok", "btok.png");
    this.load.image("btnotok", "btnotok.png");
    this.load.image("creditos2", "creditos2.png");
    this.load.image("info2", "info2.png");
    this.load.image("logout", "logout.png");
    this.load.image("fullscreen", "fullscreen2.png");
    this.load.image("fullscreen2", "fullscreen1.png");
    this.load.image("timer", "ampulhetaTempo.png");
    this.load.image("board", "quadroFinal.png");
    this.load.image("score", "pontuacaoTempo.png");
    this.load.image("background", "bg.png");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
