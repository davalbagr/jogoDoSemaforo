import {Scene} from "phaser";
import {Game} from "../../game.js";


export class Multiplayer extends Scene {
    constructor() {
        super("Multiplayer");
    }


    update(time, delta) {
        if (this.gameState.turn) {
            this.turnPlayer2.setVisible(false);
            this.turnPlayer1.setVisible(true);
        } else if (!this.gameState.turn) {
            this.turnPlayer1.setVisible(false);
            this.turnPlayer2.setVisible(true);
        }
    }

    wonLostHelper() {
        this.grid.disableInteractive();
        const sim = this.add.image(280, 480 + 116, "green").setInteractive({ useHandCursor: true });
        const nao = this.add.image(465, 480 + 116, "red").setInteractive({ useHandCursor: true });
        sim.scale = nao.scale = 0.5
        // function sim and nao interactive

        sim.once("pointerdown", () => {
            this.scene.start("Multiplayer");
        });

        nao.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });

        this.add
            .text(250, 530 + 116, "Sim", {
                fontFamily: "Arial Black",
                fontSize: 28,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })


        this.add
            .text(435, 530 + 116, "Não", {
                fontFamily: "Arial Black",
                fontSize: 28,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
    }

    p1Won() {
        this.wonLostHelper();
        this.add.text(205, 330 + 116, "O jogador 1 ganhou!\nQueres jogar mais?", {
            fontFamily: "Arial Black",
            fontSize: 28,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        })
    }

    p2Won() {
        this.wonLostHelper();
        this.add.text(205, 330 + 116, "O jogador 2 ganhou!\nQueres jogar mais?", {
            fontFamily: "Arial Black",
            fontSize: 28,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        })
    }

    create() {
        const background = this.add.image(1000 - 47, 500, "background");
        background.scale = 1.28;
        const home = this.add.image(310 - 47, 800, "home").setInteractive({ useHandCursor: true });
        this.grid = this.add.image(1080 - 47, 380 + 116, "grid").setInteractive({ useHandCursor: true });
        this.grid.scale = 1.2;
        const logo = this.add.image(422 - 47, 180, "logo");
        const pl1 = this.add.image(1650 - 47, 400, "pl1");
        const pl2 = this.add.image(1650 - 47, 520, "pl2");
        const pvp = this.add.image(430 - 47, 270 + 116, "pvp");
        pvp.scale = 0.7;
        home.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });
        this.turnPlayer1 = this.add.image(1575 - 47, 298 + 116 - 17, "pl2target");
        this.turnPlayer1.setVisible(false);
        this.turnPlayer1.scale = 0.65;
        this.turnPlayer2 = this.add.image(1575 - 47, 398 + 116 + 5, "pl1target");
        this.turnPlayer2.setVisible(false);
        this.turnPlayer2.scale = 0.65;
        this.gameState = new Game(0, false);

        this.grid.on("pointerdown", (pointer) => {
            const pos = coordToPos(pointer.x, pointer.y);
            const move = this.gameState.makeMove(pos);
            if (move == null) return;
            this.createPiece(pos);
            if (move) {
                if (this.gameState.turn) this.p2Won();
                else this.p1Won();
            }
        });
        const images = Array(12).fill(null);

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
        for (let i = 0; i < 12; i++) {
            if (i % 4 === 0) continue;
            squares[i] = {
                a: squares[i - 1].c + offsetX,
                b: squares[i - 1].b,
                c: squares[i - 1].c + offsetX + (squares[0].c - squares[0].a),
                d: squares[i - 1].d,
            };
        }
        this.createPiece = function createPiece(pos) {
            const color = this.gameState.board.board[pos];
            if (images[pos] != null) {
                images[pos].destroy();
            }
            if (color === 0) return;
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
