import {Scene} from "phaser";

export class GameOver extends Scene {
    constructor() {
        super("GameOver");
    }

    init(data) {
        this.playerWon = data.turn;
    }

    create() {
        const background = this.add.image(1000-47, 500, "background");
        background.scale = 1.28;
        if (this.playerWon) {
            this.add
                .text(512 + 340-47, 300 + 116, "You Won", {
                    fontFamily: "Arial Black",
                    fontSize: 64,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                })
        } else {
            this.add
                .text(512 + 340-47, 300 + 116, "You Lost", {
                    fontFamily: "Arial Black",
                    fontSize: 64,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                })
        }
        const home = this.add.image(310-47, 800, "home").setInteractive();
        home.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }
}
