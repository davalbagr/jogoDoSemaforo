import {Scene} from "phaser";
import {Game} from "../../game.js";


export class Multiplayer extends Scene {
    constructor() {
        super("Multiplayer");
    }


    update(time, delta) {
        if (this.gameState.turn && this.target.name === "pl2target") {
            this.target.destroy();
            this.target = this.add.image(1122+340, 298+116, "pl2target");
            this.target.name = "pl1target";
            this.target.scale *= 0.55;
        } else if (!this.gameState.turn && this.target.name === "pl1target") {
            this.target.destroy();
            this.target = this.add.image(1122+340, 398+116, "pl1target");
            this.target.name = "pl2target";
            this.target.scale *= 0.55;
        }
    }

    p1Won() {
        this.scene.start("GameOver", {turn: true});
    }

    p2Won() {
        this.scene.start("GameOver", {turn: false});
    }

    create() {
        this.add.image(660+340, 384+116, "background");
        const home = this.add.image(120+340, 620+116, "home").setInteractive();
        home.scale *= 0.7;
        const grid = this.add.image(700+340, 380+116, "grid").setInteractive();
        const logo = this.add.image(526, 241, "logo");
        logo.scale *= 0.7;
        const pl1 = this.add.image(1180+340, 300+116, "pl1");
        pl1.scale *= 0.8;
        const pl2 = this.add.image(1180+340, 400+116, "pl2");
        pl2.scale *= 0.8;
        const pvp = this.add.image(170+340, 270+116, "pvp");
        pvp.scale *= 0.5;
        home.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });
        this.target = this.add.image(1122+340, 298+116, "pl2target");
        this.target.name = "pl1target";
        this.target.scale *= 0.55;
        this.gameState = new Game(0, false);

        grid.on("pointerdown", (pointer) => {
            const pos = coordToPos(pointer.x, pointer.y);
            const move = this.gameState.makeMove(pos);
            if (move == null) return;
            this.createPiece(pos);
            if (move) {
                if (this.turn) this.p2Won();
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
            a: 375+340,
            b: 133+116,
            c: 532+340,
            d: 290+116,
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
