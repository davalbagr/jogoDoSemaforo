import { Scene } from "phaser";
import { vsCPU } from "../../engine";

export class Singleplayer extends Scene {
  constructor() {
    super("Singleplayer");
  }

  init(data) {
    this.difficulty = data.difficulty;
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
    const plcomputer = this.add.image(1180, 400, "plcomputer");
    plcomputer.scale *= 0.85;
    const pve = this.add.image(170, 270, "pve");
    pve.scale *= 0.5;
    var difficulty;
    if (this.difficulty == 3) {
      difficulty = this.add.image(250, 290, "easy");
    } else if (this.difficulty == 6) {
      difficulty = this.add.image(250, 290, "medium");
    } else {
      difficulty = this.add.image(250, 290, "hard");
    }
    difficulty.scale *= 0.3;
    const game = new vsCPU(this.difficulty, false);
    const images = Array(12).fill(null);
    grid.on("pointerdown", (pointer) => {
      if (game.turn) {
        const pos = coordToPos(pointer.position.x, pointer.position.y);
        if (pos >= 0 && game.board.board[pos] < 3) {
          if (game.board.board[pos] > 0) {
            images[pos].destroy();
          }
          const playerWon = game.makeMove(pos);
          if (playerWon) {
            this.scene.start("GameOver", { turn: true });
            return;
          }
          images[pos] = this.createPiece(pos);
          const cpuPos = game.cpuMove();
          if (game.board.board[cpuPos] > 0) {
            images[cpuPos].destroy();
          }
          const cpuWon = game.makeMove(cpuPos);
          images[cpuPos] = this.createPiece(cpuPos);
          if (cpuWon) this.scene.start("GameOver", { turn: false });
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
    console.log(squares);
    const offset = 30;
    // 670 500 160
    squares[0] = {
      a: grid.x - 320,
      b: grid.y - 245,
      c: grid.x - 187,
      d: grid.y - 95,
    };
    squares[4] = {
      a: squares[0].a,
      b: squares[0].d + offset,
      c: squares[0].c,
      d: squares[0].d + offset + (squares[0].d - squares[0].b),
    };
    squares[8] = {
      a: squares[4].a,
      b: squares[4].d + offset,
      c: squares[4].c,
      d: squares[4].d + offset + (squares[4].d - squares[4].b),
    };
    for (var i = 0; i < 12; i++) {
      if (i % 4 == 0) continue;
      squares[i] = {
        a: squares[i - 1].c + offset,
        b: squares[i - 1].b,
        c: squares[i - 1].c + offset + (squares[i - 1].c - squares[i - 1].a),
        d: squares[i - 1].d,
      };
    }
    this.createPiece = function createPiece(pos) {
      const color = game.board.board[pos];
      const centerX = (squares[pos].a + squares[pos].c) / 2;
      const centerY = (squares[pos].b + squares[pos].d) / 2;
      var piece;
      if (color == 1) {
        piece = this.add.image(centerX, centerY, "green");
      } else if (color == 2) {
        piece = this.add.image(centerX, centerY, "yellow");
      } else if (color == 3) {
        piece = this.add.image(centerX, centerY, "red");
      }
      piece.scale *= 0.7;
      return piece;
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
