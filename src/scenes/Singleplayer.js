import { Scene } from "phaser";
import { Game } from "../../game.js";

export class Singleplayer extends Scene {
  constructor() {
    super("Singleplayer");
  }

  init(data) {
    this.difficulty = data.difficulty;
  }

  update(time , delta) {
    // this.turn.rotation += 0.02;
    if (this.gameState.turn && this.turn.name === "cputarget") {
      this.turn.destroy();
      this.turn = this.add.image(1122, 298, "pl2target");
      this.turn.name = "pl1target";
      this.turn.scale *= 0.55;
    } else if (!this.gameState.turn && this.turn.name === "pl1target") {
      this.turn.destroy();
      this.turn = this.add.image(1122, 398, "cputarget");
      this.turn.name = "cputarget";
      this.turn.scale *= 0.55;
      const botMove = function () {
        const cpuPos = this.gameState.cpuMove();
        const cpuWon = this.gameState.makeMove(cpuPos);
        this.createPiece(cpuPos);
        if (cpuWon) this.lost();
      };
      setTimeout(botMove.bind(this), 2000);
    }
  }
  won() {
    this.scene.start("GameOver", { turn: true });
  }
  lost() {
    this.scene.start("GameOver", { turn: false });
  }
  create() {
    this.add.image(660, 384, "background");
    const home = this.add.image(120, 620, "home").setInteractive();
    home.scale *= 0.7;
    const grid = this.add.image(700, 380, "grid").setInteractive();
    const logo = this.add.image(180, 125, "logo");
    logo.scale *= 0.7;
    const pl1 = this.add.image(1180, 300, "pl1");
    pl1.scale *= 0.8;
    const plcomputer = this.add.image(1180, 400, "plcomputer");
    plcomputer.scale *= 0.8;
    const pve = this.add.image(170, 270, "pve");
    pve.scale *= 0.5;
    this.turn = this.add.image(1122, 298, "pl2target");
    this.turn.name = "pl1target";
    this.turn.scale *= 0.55;
    var difficulty;
    if (this.difficulty === 3) {
      difficulty = this.add.image(250, 290, "easy");
    } else if (this.difficulty === 6) {
      difficulty = this.add.image(250, 290, "medium");
    } else {
      difficulty = this.add.image(250, 290, "hard");
    }
    difficulty.scale *= 0.3;
    const game = new Game(this.difficulty);
    this.gameState = game;
    const images = Array(12).fill(null);
    grid.on("pointerdown", (pointer) => {
      if (game.turn) {
        const pos = coordToPos(pointer.position.x, pointer.position.y);
        if (pos >= 0 && game.board.board[pos] < 3) {
          const playerWon = game.makeMove(pos);
          this.createPiece(pos);
          if (playerWon) {
            this.won();
          }
        }
      }
    });
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });

    // Seccao para detetar movimentos na tela de jogo

    // quadrados da tela de jogo
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
      if (i % 4 === 0) continue;
      squares[i] = {
        a: squares[i - 1].c + offsetX,
        b: squares[i - 1].b,
        c: squares[i - 1].c + offsetX + (squares[0].c - squares[0].a),
        d: squares[i - 1].d,
      };
    }
    this.createPiece = function createPiece(pos) {
      const color = game.board.board[pos];
      if (color > 1) {
        images[pos].destroy();
      }
      const centerX = (squares[pos].a + squares[pos].c) / 2;
      const centerY = (squares[pos].b + squares[pos].d) / 2;
      let piece;
      if (color === 1) {
        piece = this.add.image(centerX, centerY, "green");
      } else if (color === 2) {
        piece = this.add.image(centerX, centerY, "yellow");
      } else if (color === 3) {
        piece = this.add.image(centerX, centerY, "red");
      }
      piece.scale *= 0.7;
      images[pos] = piece;
    };
    this.createPiece = this.createPiece.bind(this);
    function coordToPos(x, y) {
      function isInsideSquare(x1, y1, x2, y2, px, py) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        return px >= minX && px <= maxX && py >= minY && py <= maxY;
      }
      for (var i = 0; i < 12; i++) {
        if (
          isInsideSquare(
            squares[i].a,
            squares[i].b,
            squares[i].c,
            squares[i].d,
            x,
            y,
          )
        ) {
          return i;
        }
      }
      return -1;
    }
  }
}
