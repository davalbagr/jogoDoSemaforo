import { Scene } from "phaser";

export class Login extends Scene {
    constructor() {
        super("Login");
    }

    create() {
        const background = this.add.image(1000, 500, "background");
        background.scale = 1.28;
        const logo = this.add.image(422, 180, "logo");
        let user = `<input type="text" name="username" style="font-size: 15px; font-family:'font1'; text-align:center;">`;
        let pass = `<input type="password" name="password" style="font-size: 15px; font-family:'font1'; text-align:center;">`;
        let usertext = this.add.text(900, 330, "Utilizador:", { fontFamily: 'font1', fontSize: 40, color: '#000000'});
        let usernameField = this.add.dom(1000, 400).createFromHTML(user);
        usernameField.scale = 2.0;
        let passtext = this.add.text(900, 530, "Password:", { fontFamily: 'font1', fontSize: 40, color: '#000000'});
        let passwordField = this.add.dom(1000, 600).createFromHTML(pass);
        passwordField.scale = 2.0;
        let login = this.add.text(900, 700, "Login", { fontFamily: 'font1', fontSize: 40, color: '#000000'}).setInteractive();
        login.on("pointerdown", () => {

        });
        const home = this.add.image(310, 800, "home").setInteractive();
        home.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }
}