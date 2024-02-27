import { Scene } from "phaser";

export class Multiplayer extends Scene {
  constructor() {
    super("Multiplayer");
  }

  create() {
    this.add.image(660, 384, "background");
    const home = this.add.image(120, 620, "home").setInteractive();
    home.scale *= 0.7;
    const grid = this.add.image(700, 380, "grid").setInteractive();
    const logo = this.add.image(180, 125, "logo");
    logo.scale *= 0.7;
    const pl1 = this.add.image(1180, 300, "pl1");
    pl1.scale *= 0.85;
    const pl2 = this.add.image(1180, 400, "pl2");
    pl2.scale *= 0.85;
    const pvp = this.add.image(170, 270, "pvp");
    pvp.scale *= 0.5;
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
    grid.on("pointerdown", (pointer) => {
      console.log(pointer.position);
    });

    var squares = Array(12).fill(null);
    // tamanho do espaco branco entre quadrados
    const offsetY = 9;
    const offsetX = 6;
    // coordenadas do primeiro quadrado
    squares[0] = {
      a: 375,
      b: 133,
      c: 532,
      d: 290,
    };
    squares[4] = {
      a: squares[0].a,
      b: squares[0].b + offsetY + (squares[0].d - squares[0].b),
      c: squares[0].c,
      d: squares[0].d + offsetY + (squares[0].d - squares[0].b),
    };
    squares[8] = {
      a: squares[4].a,
      b: squares[4].b + offsetY + (squares[0].d - squares[0].b),
      c: squares[4].c,
      d: squares[4].d + offsetY + (squares[0].d - squares[0].b),
    };
    for (var i = 0; i < 12; i++) {
      if (i % 4 == 0) continue;
      squares[i] = {
        a: squares[i - 1].c + offsetX,
        b: squares[i - 1].b,
        c: squares[i - 1].c + offsetX + (squares[0].c - squares[0].a),
        d: squares[i - 1].d,
      };
    }
    // for (var i = 0; i < 12; i++) {
    //   this.add.circle(squares[i].a, squares[i].b, 3, 0xff0000);
    //   this.add.circle(squares[i].c, squares[i].d, 3, 0xff0000);
    // }
  }
}
