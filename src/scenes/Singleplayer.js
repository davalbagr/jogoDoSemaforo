import { Scene } from "phaser";

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

// CPU engine

class Board {
  constructor() {
    this.board = Array(12).fill(0);
  }

  move(pos) {
    if (pos < 0 || pos > 11 || this.board[pos] == 3) {
      return null;
    }
    this.board[pos] += 1;
    return this.check(pos);
  }

  check(pos) {
    if (this.board[pos] == 0) return false;
    if ([0, 1, 4, 5, 8, 9].includes(pos)) {
      // At least 2 elements to the right
      if (
        this.board[pos] === this.board[pos + 1] &&
        this.board[pos] === this.board[pos + 2]
      ) {
        return true;
      }
    } else {
      // At least 2 elements to the left
      if (
        this.board[pos] === this.board[pos - 1] &&
        this.board[pos] === this.board[pos - 2]
      ) {
        return true;
      }
    }
    if ([1, 2, 5, 6, 9, 10].includes(pos)) {
      // One element to the left and right
      if (
        this.board[pos] === this.board[pos - 1] &&
        this.board[pos] === this.board[pos + 1]
      ) {
        return true;
      }
    }
    if (Math.floor(pos / 4) === 0) {
      // Top row
      if (
        this.board[pos] === this.board[pos + 4] &&
        this.board[pos] === this.board[pos + 8]
      ) {
        return true;
      }
    } else if (Math.floor(pos / 4) === 1) {
      // Middle row
      if (
        this.board[pos] === this.board[pos - 4] &&
        this.board[pos] === this.board[pos + 4]
      ) {
        return true;
      }
    } else if (Math.floor(pos / 4) === 2) {
      // Bottom row
      if (
        this.board[pos] === this.board[pos - 4] &&
        this.board[pos] === this.board[pos - 8]
      ) {
        return true;
      }
    }
    if ([2, 5, 8].includes(pos)) {
      // First diagonal
      if (this.board[2] === this.board[5] && this.board[2] === this.board[8]) {
        return true;
      }
    } else if ([3, 6, 9].includes(pos)) {
      // Second diagonal
      if (this.board[3] === this.board[6] && this.board[3] === this.board[9]) {
        return true;
      }
    }
    if ([1, 6, 11].includes(pos)) {
      // Third diagonal
      if (this.board[1] === this.board[6] && this.board[1] === this.board[11]) {
        return true;
      }
    } else if ([0, 5, 10].includes(pos)) {
      // Fourth diagonal
      if (this.board[0] === this.board[5] && this.board[5] === this.board[10]) {
        return true;
      }
    }
    return false;
  }

  *get_possible_moves(color) {
    for (let pos = 0; pos < 12; pos++) {
      if (this.board[pos] + 1 === color) {
        yield pos;
      }
    }
  }

  is_terminal() {
    return this.board.some((_, pos) => this.check(pos));
  }
}

class Player {
  constructor(board) {
    this.board = board;
    this.green = 8;
    this.yellow = 8;
    this.red = 8;
  }

  makeMove(pos) {
    if (this.board[pos] === 0) {
      if (this.green === 0) {
        return null;
      }
      this.green -= 1;
    }
    if (this.board[pos] === 1) {
      if (this.yellow === 0) {
        return null;
      }
      this.yellow -= 1;
    }
    if (this.board[pos] === 2) {
      if (this.red === 0) {
        return null;
      }
      this.red -= 1;
    }
    return this.board.move(pos);
  }

  *get_possible_moves() {
    if (this.green > 0) {
      yield* this.board.get_possible_moves(1);
    }
    if (this.yellow > 0) {
      yield* this.board.get_possible_moves(2);
    }
    if (this.red > 0) {
      yield* this.board.get_possible_moves(3);
    }
  }
}

export class vsCPU {
  constructor(difficulty, tossCoin = true) {
    this.board = new Board();
    this.player = new Player(this.board);
    this.bot = new Player(this.board);
    this.turn = true;
    this.difficulty = difficulty;
    if (tossCoin) {
      const coinToss = Math.random();
      if (coinToss > 0.5) {
        this.turn = false;
        const move = this.cpuMove();
        return this.makeMove(move);
      }
    }
  }

  minimax(
    depth,
    alpha = Number.NEGATIVE_INFINITY,
    beta = Number.POSITIVE_INFINITY,
  ) {
    var evaluation = this.turn
      ? Number.NEGATIVE_INFINITY
      : Number.POSITIVE_INFINITY;
    if (this.board.is_terminal()) {
      return [evaluation, null];
    }
    if (depth === 0) {
      return [this.evaluate(), null];
    }
    var best_move = null;
    let shouldReplace = this.turn
      ? function (x, y) {
          return x > y;
        }
      : function (x, y) {
          return x < y;
        };
    for (const move of this.getCurrentPlayer().get_possible_moves()) {
      this.makeMove(move);
      const res = this.minimax(depth - 1, alpha, beta);
      const childEvaluation = res[0];
      this.undoMove(move);
      if (shouldReplace(childEvaluation, evaluation)) {
        best_move = move;
        evaluation = childEvaluation;
      }
      if (this.turn) alpha = Math.max(alpha, childEvaluation);
      else beta = Math.min(beta, childEvaluation);
      if (alpha >= beta) break;
    }
    return [evaluation, best_move];
  }

  evaluate() {
    let score = 0;
    for (const pos of this.getCurrentPlayer().get_possible_moves()) {
      if (this.makeMove(pos)) {
        score += 10000;
      }
      this.undoMove(pos);
    }
    return score;
  }

  getCurrentPlayer() {
    return this.turn ? this.player : this.bot;
  }

  makeMove(pos) {
    const t = this.getCurrentPlayer().makeMove(pos);
    if (t != null) this.turn = !this.turn;
    return t;
  }

  undoMove(pos) {
    this.board.board[pos] -= 1;
    this.turn = !this.turn;
    const player = this.getCurrentPlayer();
    if (this.board.board[pos] == 0) player.green += 1;
    else if (this.board.board[pos] == 1) player.yellow += 1;
    else if (this.board.board[pos] == 2) player.red += 1;
  }

  cpuMove() {
    const res = this.minimax(this.difficulty);
    return res[1];
  }
}
