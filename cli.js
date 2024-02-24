class Board {
  constructor() {
    this.board = Array(12).fill(0);
  }

  move(pos, color) {
    if (pos < 0 || pos > 11 || color < 0 || color > 3) {
      return null;
    }
    if (this.board[pos] + 1 !== color) {
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

  makeMove(pos, color) {
    if (color === 1) {
      if (this.green === 0) {
        return null;
      }
      this.green -= 1;
    }
    if (color === 2) {
      if (this.yellow === 0) {
        return null;
      }
      this.yellow -= 1;
    }
    if (color === 3) {
      if (this.red === 0) {
        return null;
      }
      this.red -= 1;
    }
    return this.board.move(pos, color);
  }

  *get_possible_moves(color) {
    if (this.green && color === 1) {
      yield* this.board.get_possible_moves(1);
    } else if (this.yellow && color === 2) {
      yield* this.board.get_possible_moves(2);
    } else if (this.red && color === 3) {
      yield* this.board.get_possible_moves(3);
    }
  }

  getColor(color) {
    if (color == 1) return this.green;
    if (color == 2) return this.yellow;
    if (color == 3) return this.red;
    return 0;
  }
}

class vsCPU {
  constructor(dificulty) {
    this.board = new Board();
    this.player = new Player(this.board);
    this.bot = new Player(this.board);
    this.turn = false;
    this.dificulty = dificulty;
    const coinToss = Math.random();
    if (coinToss > 0.5) {
      this.turn = true;
    } else {
      this.cpuMove();
    }
  }

  minimax(
    depth,
    alpha = Number.NEGATIVE_INFINITY,
    beta = Number.POSITIVE_INFINITY,
  ) {
    if (this.board.is_terminal()) {
      this.turn ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (depth === 0) {
      return [this.evaluate(), null, 0];
    }
    var evaluation = this.turn
      ? Number.NEGATIVE_INFINITY
      : Number.POSITIVE_INFINITY;
    var best_move = null;
    var best_color = 0;
    let shouldReplace = this.turn
      ? function (x, y) {
          return x > y;
        }
      : function (x, y) {
          return x < y;
        };
    for (var color = 1; color <= 3; color++) {
      for (const move of this.getCurrentPlayer().get_possible_moves(color)) {
        this.makeMove(move, color);
        const [childEvalution, ,] = this.minimax(depth - 1, alpha, beta);
        this.undoMove(move, color);
        if (shouldReplace(childEvalution, evaluation)) {
          best_move = move;
          best_color = color;
          evaluation = childEvalution;
        }
        if (this.turn) alpha = Math.max(alpha, childEvalution);
        else beta = Math.min(beta, childEvalution);
        if (alpha >= beta) break;
      }
    }
    return [evaluation, best_move, best_color];
  }

  evaluate() {
    const green_score = this.evaluate_color(1);
    const yellow_score = this.evaluate_color(2);
    const red_score = this.evaluate_color(3);
    return Math.max(green_score, yellow_score, red_score);
  }

  evaluate_color(color) {
    if (this.getCurrentPlayer().getColor(color) == 0)
      return Number.NEGATIVE_INFINITY;
    let score = 0;
    // canto superior esquerdo e canto superior direito da mesma cor
    // if (this.board[0] == color && this.board[3] == color) score -= 100;
    // canto inferior esquerdo e canto inferior direito da mesma cor
    // if (this.board[8] == color && this.board[11] == color) score -= 100;

    for (const pos of this.getCurrentPlayer().get_possible_moves(color)) {
      if (this.makeMove(pos, color)) {
        score += 100000;
      }
      this.undoMove(pos, color);
    }
    return score;
  }

  getCurrentPlayer() {
    return this.turn ? this.player : this.bot;
  }

  makeMove(pos, color) {
    const t = this.getCurrentPlayer().makeMove(pos, color);
    if (t != null) this.turn = !this.turn;
    return t;
  }

  undoMove(pos, color) {
    this.board.board[pos] -= 1;
    this.turn = !this.turn;
    const player = this.getCurrentPlayer();
    if (color === 1) player.green += 1;
    else if (color === 2) player.yellow += 1;
    else if (color === 3) player.red += 1;
  }

  cpuMove() {
    const [, best_move, best_color] = this.minimax(this.dificulty);
    if (best_move == null) return null;
    return this.makeMove(best_move, best_color);
  }

  printBoard() {
    console.log(this.board.board.slice(0, 4));
    console.log(this.board.board.slice(4, 8));
    console.log(this.board.board.slice(8, 12));
  }
}

import { createInterface } from "readline";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const game = new vsCPU(8);
  game.printBoard();
  console.log();
  while (true) {
    var t;
    if (game.turn) {
      const input = await new Promise((resolve) =>
        rl.question(
          "Enter the position (0-11) and then color (1-3): ",
          resolve,
        ),
      );
      const [pos, color] = input.split(" ").map(Number);
      t = game.makeMove(pos, color);
    } else {
      console.log("AI's turn ...");
      t = game.cpuMove();
    }
    console.log();
    if (t) {
      console.log(game.turn ? "You Lost" : "You Won");
      break;
    } else if (t === null) {
      if (game.turn) console.log("Invalid Move");
      else {
        console.log("Error");
        process.exit(1);
      }
    } else {
      game.printBoard();
    }
    console.log();
  }
  game.printBoard();
  rl.close();
}

main();
