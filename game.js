export class Board {
    constructor() {
        this.board = Array(12).fill(0);
    }

    move(pos) {
        if (pos < 0 || pos > 11 || this.board[pos] === 3) {
            return null;
        }
        this.board[pos] += 1;
        return this.check(pos);
    }

    check(pos) {
        if (this.board[pos] === 0) return false;
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

    *get_possible_moves() {
        for (let pos = 0; pos < 12; pos++) {
            if (this.board[pos] < 3) {
                yield pos;
            }
        }
    }

    is_terminal() {
        return this.board.some((_, pos) => this.check(pos));
    }
}

export class Game {
    constructor(difficulty, tossCoin = true) {
        this.board = new Board();
        this.turn = true;
        this.difficulty = difficulty;
        if (tossCoin) {
            const coinToss = Math.random();
            if (coinToss > 0.5) {
                this.turn = false;
            }
        }
    }

    minimax(
        depth,
        alpha = Number.NEGATIVE_INFINITY,
        beta = Number.POSITIVE_INFINITY,
    ) {
        if (this.board.is_terminal()) {
            return [this.turn ? -1000000 : 1000000, null];
        }
        if (depth === 0) {
            return [this.evaluate(), null];
        }
        let evaluation = this.turn
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY;
        let best_move = null;
        let shouldReplace = this.turn
            ? function (x, y) {
                return x > y;
            }
            : function (x, y) {
                return x < y;
            };
        for (const move of this.board.get_possible_moves()) {
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
        for (const pos of this.board.get_possible_moves()) {
            if (this.makeMove(pos)) {
                score += 10000;
            }
            this.undoMove(pos);
        }
        score += Math.random();
        return score;
    }

    makeMove(pos) {
        const t = this.board.move(pos);
        if (t !== null) this.turn = !this.turn;
        return t;
    }

    undoMove(pos) {
        this.board.board[pos] -= 1;
        this.turn = !this.turn;
    }

    cpuMove() {
        const move = this.minimax(this.difficulty);
        return move[1];
    }
}