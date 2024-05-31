import {Scene} from "phaser";
import {AlignGrid} from "../lib/AlignGrid.js";
import {infoUser, updateTOP} from "../lib/backEndconnector.js";

export class Leaderboard extends Scene {
    constructor() {
        super('Leaderboard');
    }

    preload() {
        this.load.scenePlugin('rexuiplugin', 'rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.rexUI = this.plugins.get('rexUI');
    }

    init(data) {
        this.array = data;
    }

    update(time, delta) {
        if (this.dificulty === 1) {
            this.smallEasy.setVisible(true);
            this.smallMedium.setVisible(false);
            this.smallHard.setVisible(false);
        } else if (this.dificulty === 2) {
            this.smallEasy.setVisible(false);
            this.smallMedium.setVisible(true);
            this.smallHard.setVisible(false);
        } else if (this.dificulty === 3) {
            this.smallEasy.setVisible(false);
            this.smallMedium.setVisible(false);
            this.smallHard.setVisible(true);
        }
    }

    create() {
        this.dificulty = 1;
        this.flag = 2;
        this.lastclick;
        this.lastclick2;
        var color1 = '#FFFFFF';
        var color2 = '#FFFFFF';
        var gridConfig = {
            'scene': this,
            'cols': 15,
            'rows': 15
        }
        this.aGrid = new AlignGrid(this.game, gridConfig);

        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        if (m > 7) {
            var x = n;
            var y = n + 1;
        } else {
            var x = n - 1;
            var y = n;
        }

        this.di = x + "-09-01";
        this.df = y + "-08-31";

        var scrollMode = 0;
        const background = this.add.image(1000 - 37, 540, "background");
        background.scale = 1.35;
        const logo = this.add.image(311, 180, "logo");
        logo.scale = 0.9;
        const home = this.add.image(233, 860, "home").setInteractive({useHandCursor: true});
        home.once("pointerdown", () => {
            this.scene.start("MainMenu");
        });

        this.table = this.rexUI.add.gridTable({
            x: 1238,
            y: 686,
            width: 1100,
            height: 580,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 20, 0x610716),//.setAlpha(0.95),

            table: {
                cellWidth: 50,
                cellHeight: 50,
                columns: 6,

                mask: {
                    padding: 2,
                    updateMode: 0,
                },

                reuseCellContainer: true,
            },
            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x2b040a),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xcf0c2d),
            },
            space: {
                left: 10,
                right: 26,
                top: 132,
                bottom: 30,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                let newwith;

                if (cell.index % 6 == 0) { // index
                    newwith = 10;
                }
                if (cell.index % 6 == 1) { // nome
                    newwith = 10;
                }
                if (cell.index % 6 == 2) { // pontos
                    newwith = 550;
                }
                if (cell.index % 6 == 3) { // escola
                    newwith = 850;
                }
                if (cell.index % 6 == 4) { // turma
                    newwith = 1175;
                }
                if (cell.index % 6 == 5) {
                    newwith = 1380;
                }

                var scene = cell.scene,
                    width = newwith,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index,

                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: 'top-to-bottom',
                        text: scene.add.text(50, 50, item.name, {
                            fontFamily: "font1",
                            fontSize: 21,
                            color: color2,
                            align: 'center'
                        }),
                        align: 'center',
                    });

                return cellContainer;
            },
            items: this.CreateItems(600)
        }).layout();

        this.aGrid.placeAt(7, 7.5, this.table);

        this.containerAno = this.rexUI.add.roundRectangle(0, 0, 200, 580, 20, 0x610716)//.setAlpha(0.95);
        this.containerAno.setOrigin(0.42, 0.56);
        this.aGrid.placeAtIndex(132, this.containerAno);

        this.rexUI.add.gridTable({
            x: 1610,
            y: 470,
            width: 180,
            height: 250,

            scrollMode: scrollMode,

            table: {
                cellWidth: 100,
                cellHeight: 50,
                columns: 1,

                mask: {
                    padding: 2,
                    updateMode: 0,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x2b040a),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xcf0c2d),
            },
            space: {
                left: 20,
                right: 0,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {

                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index,

                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: 0,
                        icon: scene.add.circle(0, 50, 10).setFillStyle('0xffffff'),
                        text: scene.add.text(50, 50, item, {
                            fontFamily: "font1",
                            fontSize: 25,
                            color: color1,
                            align: 'center'
                        }),
                        align: 'center',
                        space: {
                            icon: 20,
                        }
                    });

                var m = d.getMonth();
                var n = d.getFullYear();
                if (m > 7) {
                    var x = n;
                    var y = n + 1;
                } else {
                    var x = n - 1;
                    var y = n;
                }

                x = "" + x;
                y = "" + y;

                cellContainer.setInteractive({useHandCursor: true});
                cellContainer.on('pointerdown', () => {
                    if (scene.lastclick) {
                        scene.lastclick.setFillStyle('0xffffff');
                    }
                    scene.lastclick = cellContainer.getElement('icon').setFillStyle('0xcf0c2d');

                    if (cellContainer.getElement('text')._text != "Todos") {
                        scene.di = "20" + cellContainer.getElement('text')._text.split('-')[0] + "-9-1";
                        scene.df = "20" + cellContainer.getElement('text')._text.split('-')[1] + "-8-31";

                    } else {
                        scene.di = "2023-09-01"
                        scene.df = new Date().toISOString().slice(0, 10)
                    }

                    updateTOP(scene.di, scene.df, infoUser.turma, infoUser.escola, scene.flag, scene.dificulty, scene);
                });

                if (scene.lastclick == null) {
                }
                let tmp = x.slice(2, 4) + "-" + y.slice(2, 4);
                if (cellContainer.getElement('text')._text == tmp) {
                    scene.lastclick = cellContainer.getElement('icon').setFillStyle('0xcf0c2d');
                }

                return cellContainer;
            },
            items: this.selectYear()
        }).layout();

        const easy = this.add.image(300, 450, "easy").setInteractive({useHandCursor: true});
        const medium = this.add.image(300, 560, "medium").setInteractive({useHandCursor: true});
        const hard = this.add.image(300, 670, "hard").setInteractive({useHandCursor: true});

        this.smallEasy = this.add.image(1470, 330, "easy");
        this.smallEasy.setVisible(false);
        this.smallMedium = this.add.image(1470, 330, "medium");
        this.smallMedium.setVisible(false);
        this.smallHard = this.add.image(1470, 330, "hard");
        this.smallHard.setVisible(false);
        this.smallEasy.scale = 0.4;
        this.smallMedium.scale = 0.4;
        this.smallHard.scale = 0.29;

        easy.scale = 0.75;
        medium.scale = 0.75;
        hard.scale = 0.55;

        easy.on('pointerdown', () => {
            this.dificulty = 1;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this.dificulty, this);
        })

        medium.on('pointerdown', () => {
            this.dificulty = 2;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this.dificulty, this);
        })

        hard.on('pointerdown', () => {
            this.dificulty = 3;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this.dificulty, this);
        })


        this.filtro = this.add.text(0, 0, 'Filtro', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.filtro.setOrigin(2, 1);
        this.aGrid.placeAtIndex(163, this.filtro);

        this.todos = this.add.text(0, 0, 'Todos', {fontFamily: "font1", fontSize: 25, color: color1, align: 'left'});
        this.todos.setOrigin(2, 1.5);
        this.aGrid.placeAtIndex(178, this.todos);
        this.todos.setInteractive({useHandCursor: true});

        this.todos_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.todos_icon.setOrigin(9, 1.7);
        this.aGrid.placeAtIndex(178, this.todos_icon);

        this.escola_filtro = this.add.text(0, 0, 'Escola', {
            fontFamily: "font1",
            fontSize: 25,
            color: color1,
            align: 'left'
        });
        this.escola_filtro.setOrigin(1.9, 0.1);
        this.aGrid.placeAtIndex(178, this.escola_filtro);
        this.escola_filtro.setInteractive({useHandCursor: true});

        this.escola_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.escola_icon.setOrigin(9, -0.35);
        this.aGrid.placeAtIndex(178, this.escola_icon);

        this.turma_filtro = this.add.text(0, 0, 'Turma', {
            fontFamily: "font1",
            fontSize: 25,
            color: color1,
            align: 'left'
        });
        this.turma_filtro.setOrigin(1.9, -1.3);
        this.aGrid.placeAtIndex(178, this.turma_filtro);
        this.turma_filtro.setInteractive({useHandCursor: true});

        this.turma_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.turma_icon.setOrigin(9, -2.5);
        this.aGrid.placeAtIndex(178, this.turma_icon);

        this.filtro.y -= 50;
        this.todos.y -= 50;
        this.escola_filtro.y -= 50;
        this.turma_filtro.y -= 50;
        this.todos_icon.y -= 50;
        this.turma_icon.y -= 50;
        this.escola_icon.y -= 50;

        this.todos.input.hitArea.setTo(-50, 0, this.todos.width + 60, this.todos.height);
        this.escola_filtro.input.hitArea.setTo(-50, 0, this.escola_filtro.width + 60, this.escola_filtro.height);
        this.turma_filtro.input.hitArea.setTo(-50, 0, this.turma_filtro.width + 60, this.turma_filtro.height);

        this.filtro.visible = false;
        this.todos.visible = false;
        this.todos_icon.visible = false;
        this.escola_filtro.visible = false;
        this.escola_icon.visible = false;
        this.turma_filtro.visible = false;
        this.turma_icon.visible = false;

        if (infoUser.user != '') {
            this.filtro.visible = true;
            this.todos.visible = true;
            this.todos_icon.visible = true;
            this.escola_filtro.visible = true;
            this.escola_icon.visible = true;
            this.turma_filtro.visible = true;
            this.turma_icon.visible = true;
            this.todos_icon.setFillStyle('0xcf0c2d');
        }

        this.todos.on('pointerdown', () => {
            this.todos_icon.setFillStyle('0xcf0c2d');
            this.escola_icon.setFillStyle('0xffffff');
            this.turma_icon.setFillStyle('0xffffff');
            this.flag = 2;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this.dificulty, this);
        });

        this.escola_filtro.on('pointerdown', () => {
            this.todos_icon.setFillStyle('0xffffff');
            this.escola_icon.setFillStyle('0xcf0c2d');
            this.turma_icon.setFillStyle('0xffffff');
            this.flag = 1;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this.dificulty, this);
        });

        this.turma_filtro.on('pointerdown', () => {
            this.todos_icon.setFillStyle('0xffffff');
            this.escola_icon.setFillStyle('0xffffff');
            this.turma_icon.setFillStyle('0xcf0c2d');
            this.flag = 0;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this.dificulty, this);
        });

        this.ano = this.add.text(0, 0, 'Ano letivo', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.ano.setOrigin(0, 0.7);
        this.aGrid.placeAtIndex(71.5, this.ano);

        this.jogador = this.add.text(0, 0, 'Jogador', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.jogador.setOrigin(0.7, 2);
        this.aGrid.placeAtIndex(79, this.jogador);

        this.pontos = this.add.text(0, 0, 'Pontos', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.pontos.setOrigin(0.9, 2); //old 0.55 (i think) new 0.25
        this.aGrid.placeAtIndex(81, this.pontos);

        this.escola = this.add.text(0, 0, 'Escola', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.escola.setOrigin(1.7, 2);
        this.aGrid.placeAtIndex(83, this.escola);

        this.turma = this.add.text(0, 0, 'Turma', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.turma.setOrigin(2, 2);
        this.aGrid.placeAtIndex(85, this.turma);

        this.data = this.add.text(0, 0, 'Data', {fontFamily: 'font1', fontSize: 30, color: color1});
        this.data.setOrigin(4.3, 2);
        this.aGrid.placeAtIndex(87, this.data);
    }

    CreateItems(count) {
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.array[i] != "") {
                data.push({
                    name: this.array[i],
                });
            }
        }
        if (this.array.length < 4) {
            return []
        }
        return data;
    }

    selectYear() {
        var data = []
        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        if (m > 7) {
            var y = n + 1;
        } else {
            var y = n;
        }
        let j = 23;
        for (let i = 2023; i < y; i++) {

            data.push("" + j + "-" + (j + 1));
            j++;
        }
        data.push("Todos");
        data = data.reverse();
        return data;
    }
}
