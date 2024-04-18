import {Scene} from "phaser";
import {Game} from "../../game.js";
import * as Backend from "../lib/backEndconnector.js";
import {infoUser} from "../lib/backEndconnector.js";

export class Singleplayer extends Scene {
    constructor() {
        super("Singleplayer");
    }

    init(data) {
        this.difficulty = data.difficulty;
        this.easyDif = data.easyDif;
        this.mediumDif = data.mediumDif;
    }

    update(time, delta) {
        if (this.hasEnded) return;
        if (this.gameState.turn) {
            this.turnComp.setVisible(false);
            this.turnPlayer.setVisible(true);
            this.readyMove = true;
        } else if (!this.gameState.turn) {
            this.turnPlayer.setVisible(false);
            this.turnComp.setVisible(true);
            const botMove = function () {
                const cpuPos = this.gameState.cpuMove();
                const cpuWon = this.gameState.makeMove(cpuPos);
                this.createPiece(cpuPos);
                if (cpuWon) {
                    this.grid.disableInteractive();
                    this.lost();
                }
            }
            if (this.readyMove) {
                this.time.delayedCall(2000, botMove.bind(this));
                this.readyMove = false;
            }
        }
    }


    wonLostHelper() {
        this.grid.disableInteractive();
        const sim = this.add.image(280, 480 + 116, "btok").setInteractive({ useHandCursor: true });
        const nao = this.add.image(465, 480 + 116, "btnotok").setInteractive({ useHandCursor: true });
        sim.scale = nao.scale = 0.5;

        sim.once("pointerdown", () => {
            this.scene.start("Singleplayer");
        });

        nao.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });
        this.hasEnded = true;
    }

    won() {
        this.wonLostHelper();
        this.add.text(205+30, 330 + 116, "Tu ganhaste!\nQueres jogar mais?", {
            fontFamily: "font1",
            fontSize: 28,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        })
        if (Backend.infoUser.user !== '') {
            let tip = 3;
            if (this.difficulty === this.easyDif) { tip = 1;}
            if (this.difficulty === this.mediumDif) { tip = 2;}
            Backend.updatePontuacao(infoUser.user, infoUser.turma, infoUser.escola, tip);
        }
    }

    lost() {
        this.wonLostHelper();
        this.add.text(205+30, 330 + 116, "O computador ganhou!\nQueres jogar mais?", {
            fontFamily: "font1",
            fontSize: 28,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        })
    }

    create() {
        this.hasEnded = false;
        const background = this.add.image(1000 - 47, 500, "background");
        background.scale = 1.28;
        const home = this.add.image(310 - 47, 800, "home").setInteractive({ useHandCursor: true });
        const grid = this.add.image(1080 - 47, 380 + 116, "grid").setInteractive({ useHandCursor: true });
        grid.scale = 1.2;
        this.grid = grid;
        const logo = this.add.image(422-74, 180, "logo");
        logo.scale = 0.9;
        const pl1 = this.add.image(1650 - 47, 400, "pl1");
        const plcomputer = this.add.image(1650 - 47, 520, "plcomputer");
        const pve = this.add.image(420 - 47, 270 + 116, "pve");
        pve.scale = 0.7;
        this.turnPlayer = this.add.image(1575 - 47, 298 + 116 - 17, "pl2target");
        this.turnPlayer.setVisible(false);
        this.turnPlayer.scale = 0.65;
        this.turnComp = this.add.image(1575 - 47, 398 + 116 + 5, "cputarget");
        this.turnComp.setVisible(false);
        this.turnComp.scale = 0.65;
        this.readyMove = true;
        let difficulty;
        if (this.difficulty === this.easyDif) {
            difficulty = this.add.image(530 - 47, 420, "easy");
        } else if (this.difficulty === this.mediumDif) {
            difficulty = this.add.image(530 - 47, 420, "medium");
        } else {
            difficulty = this.add.image(530 - 47, 420, "hard");
        }
        difficulty.scale = 0.4;
        this.gameState = new Game(this.difficulty);
        const images = Array(12).fill(null);
        grid.on("pointerdown", (pointer) => {
            if (!this.gameState.turn) return;
            const pos = coordToPos(pointer.position.x, pointer.position.y);
            if (pos >= 0 && this.gameState.board.board[pos] < 3) {
                const playerWon = this.gameState.makeMove(pos);
                this.createPiece(pos);
                if (playerWon) {
                    this.won();
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
            a: 690 - 47,
            b: 202,
            c: 879 - 47,
            d: 389,
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
            if (squares[pos] === undefined) {return;}
            const color = this.gameState.board.board[pos];
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
            piece.scale = 0.9;
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
