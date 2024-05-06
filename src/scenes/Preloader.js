import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here

    //  A simple progress bar. This is the outline of the bar.

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
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
    this.load.image("info2", "creditos2.png");
    this.load.image("logout", "logout.png");
    this.load.image("fullscreen", "fullscreen1.png");
    this.load.image("fullscreen2", "fullscreen2.png");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
