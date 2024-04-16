import { Scene } from "phaser";
import { AlignGrid } from "../lib/AlignGrid.js";

export class Leaderboard extends Scene {
  constructor() {
    super("Leaderboard");
  }

  init(data) {
    this.array = data;
  }

  create() {
    const background = this.add.image(1000-47, 500, "background");
    background.scale = 1.28;
    const logo = this.add.image(422-74, 180, "logo");
    logo.scale = 0.9;
    const home = this.add.image(310-47, 800, "home").setInteractive({ useHandCursor: true });
    home.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });

  //   var color1 = '#FFD700';
  //   var color2 = '#FFEBCD';
  //   var gridConfig = {
  //     'scene': this,
  //     'cols': 15,
  //     'rows': 15
  //   }
  //   this.aGrid = new AlignGrid(this.game, gridConfig);
  //
  //   var d = new Date();
  //   var m = d.getMonth();
  //   var n = d.getFullYear();
  //   if (m > 7) {
  //     var x = n;
  //     var y = n + 1;
  //   }
  //   else {
  //     var x = n - 1;
  //     var y = n;
  //   }
  //
  //   this.di = x + "-09-01";
  //   this.df = y + "-08-31";
  //   this.dificulty = 1;
  //   var scrollMode = 0; // 0:vertical, 1:horizontal
  //
  //   this.table = this.rexUI.add.gridTable({
  //     x: 1038,
  //     y: 686,
  //     width:1575,
  //     height:640,
  //
  //     scrollMode: scrollMode,
  //
  //     background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x070719).setAlpha(0.2),
  //
  //     table: {
  //       cellWidth: 50,
  //       cellHeight: 50,
  //       columns: 6,
  //
  //       mask: {
  //         padding: 2,
  //         updateMode: 0,
  //       },
  //
  //       reuseCellContainer: true,
  //     },
  //
  //     slider: {
  //       track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x0B610B),
  //       thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x3ADF00),
  //     },
  //     space: {
  //       left: 10,
  //       right: 26,
  //       top: 132,
  //       bottom: 30,
  //
  //       table: 10,
  //       header: 10,
  //       footer: 10,
  //     },
  //
  //
  //     createCellContainerCallback: function (cell, cellContainer) {
  //       let newwith ;
  //
  //       if (cell.index % 6 == 0) {//index
  //         newwith = 10;
  //       }
  //       if (cell.index % 6 == 1) {//nome
  //         newwith = 200;
  //       }
  //       if (cell.index % 6 == 2) {//pontos
  //         newwith = 830;
  //       }
  //       if (cell.index % 6 == 3) {//Escola
  //         newwith = 1390;
  //       }
  //       if (cell.index % 6 == 4) {//turm
  //         newwith = 2000;
  //       }
  //       if (cell.index % 6 == 5) {
  //         newwith = 2300;
  //       }
  //
  //
  //       var scene = cell.scene,
  //           width = newwith,
  //           height = cell.height,
  //           item = cell.item,
  //           index = cell.index,
  //
  //           cellContainer = scene.rexUI.add.label({
  //             width: width,
  //             height: height,
  //
  //             orientation: 'top-to-bottom',
  //             text: scene.add.text(50, 50, item.name, { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'center' }),
  //             align: 'center',
  //           });
  //
  //       return cellContainer;
  //     },
  //     items: this.CreateItems(600)
  //   }).layout();
  //
  //   this.aGrid.placeAt(6.3535, 7.87, this.table);
  //
  //   this.container = this.rexUI.add.roundRectangle(0, 0, 200, 640, 0, 0x070719).setAlpha(0.2);
  //   this.container.setOrigin(0.6, 0.5155);
  //   this.aGrid.placeAtIndex(133, this.container);
  //
  //   this.lastclick;
  //
  //   this.dropdown = this.rexUI.add.gridTable({
  //     x: 1800,
  //     y: 585,
  //     width: 160,
  //     height: 280,
  //
  //     scrollMode: scrollMode,
  //
  //     table: {
  //       cellWidth: 100,
  //       cellHeight: 50,
  //       columns: 1,
  //
  //       mask: {
  //         padding: 2,
  //         updateMode: 0,
  //       },
  //
  //       reuseCellContainer: true,
  //     },
  //
  //
  //
  //     slider: {
  //       track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x0B610B),
  //       thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x3ADF00),
  //     },
  //     space: {
  //       left: 20,
  //       right: -25,
  //       top: 35,
  //       bottom: 20,
  //
  //       table: 10,
  //       header: 10,
  //       footer: 10,
  //     },
  //
  //     createCellContainerCallback: function (cell, cellContainer) {
  //
  //       var scene = cell.scene,
  //           width = cell.width,
  //           height = cell.height,
  //           item = cell.item,
  //           index = cell.index,
  //
  //           cellContainer = scene.rexUI.add.label({
  //             width: width,
  //             height: height,
  //
  //             orientation: 0,
  //             icon: scene.add.circle(0,50,10).setFillStyle('0xffffff'),
  //             text: scene.add.text(50, 50, item, { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'center' }),
  //             align: 'center',
  //             space: {
  //               icon: 20,
  //             }
  //           });
  //
  //
  //       var m = d.getMonth();
  //       var n = d.getFullYear();
  //       if (m > 7) {
  //         var x = n;
  //         var y = n + 1;
  //       }
  //       else {
  //         var x = n - 1;
  //         var y = n;
  //       }
  //
  //       x = "" + x;
  //       y = "" + y;
  //
  //       cellContainer.setInteractive({ useHandCursor: true });
  //       cellContainer.on('pointerdown', () => {
  //         if (scene.lastclick) {
  //           scene.lastclick.setFillStyle('0xffffff');
  //         }
  //         scene.lastclick = cellContainer.getElement('icon').setFillStyle('0x088A08');
  //
  //         if (cellContainer.getElement('text')._text != "Todos") {
  //           scene.di = "20" + cellContainer.getElement('text')._text.split('-')[0] + "-9-1";
  //           scene.df = "20"+cellContainer.getElement('text')._text.split('-')[1] + "-8-31";
  //
  //         }
  //         else {
  //           scene.di = "2015-09-01"
  //           scene.df = new Date().toISOString().slice(0, 10)
  //         }
  //         updateTOP(scene.di, scene.df, infoUser.turma, infoUser.escola, 2, scene);
  //       });
  //
  //       let tmp = x.slice(2, 4) +"-" +y.slice(2,4);
  //       if (cellContainer.getElement('text')._text == tmp) {
  //         scene.lastclick = cellContainer.getElement('icon').setFillStyle('0xffffff');
  //       }
  //
  //       return cellContainer;
  //
  //
  //     },
  //     items: this.selectYear()
  //   })
  //       .layout()
  //
  //
  //   this.ano = this.add.text(0, 0, 'Ano letivo', { fontFamily: 'font1', fontSize: 32, color: '#0A2A0A' });
  //   this.ano.setOrigin(0.65, 1.1);
  //   this.aGrid.placeAtIndex(73, this.ano);
  //   this.ano.y = 418;
  //
  //
  //   //Filtros
  //   this.filtro = this.add.text(0, 0, 'Filtro', { fontFamily: 'font1', fontSize: 32, color: '#0A2A0A' });
  //   this.filtro.setOrigin(1.3, 1);
  //   this.aGrid.placeAtIndex(163.3, this.filtro);
  //   this.filtro.y -= 50;
  //
  //
  //   //Todos
  //   this.todos = this.add.text(0, 0, 'Todos', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
  //   this.todos.setOrigin(0.8, 1.7);
  //   this.aGrid.placeAtIndex(178, this.todos);
  //   this.todos_icon = this.add.circle(0,0,10).setFillStyle('0xffffff');
  //   this.todos_icon.setOrigin(5.18, 3);
  //   this.aGrid.placeAtIndex(178, this.todos_icon);
  //   this.todos.setInteractive({ useHandCursor: true });
  //
  //   //Escola
  //   this.escola_filtro = this.add.text(0, 0, 'Escola', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
  //   this.escola_filtro.setOrigin(0.8, 0.3);
  //   this.aGrid.placeAtIndex(178, this.escola_filtro);
  //   this.escola_icon = this.add.circle(0,0,10).setFillStyle('0xffffff');
  //   this.escola_icon.setOrigin(5.18, 0);
  //   this.aGrid.placeAtIndex(178, this.escola_icon);
  //   this.escola_filtro.setInteractive({ useHandCursor: true });
  //
  //   //Turma
  //   this.turma_filtro = this.add.text(0, 0, 'Turma', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
  //   this.turma_filtro.setOrigin(0.8, -1);
  //   this.aGrid.placeAtIndex(178, this.turma_filtro);
  //   this.turma_icon = this.add.circle(0,0,10).setFillStyle('0xffffff');
  //   this.turma_icon.setOrigin(5.18, -2.5);
  //   this.aGrid.placeAtIndex(178, this.turma_icon);
  //   this.turma_filtro.setInteractive({ useHandCursor: true });
  //
  //   this.todos.input.hitArea.setTo(-50, -5, this.todos.width + 60, this.todos.height);
  //
  //   this.todos.y -=50;
  //   this.escola_filtro.y -= 50;
  //   this.turma_filtro.y -=50;
  //   this.todos_icon.y -=40;
  //   this.turma_icon.y -= 50;
  //   this.escola_icon.y -=50;
  //   this.todos.on('pointerdown', () => {
  //
  //     this.todos_icon.setFillStyle('0x088A08');
  //
  //     this.escola_icon.setFillStyle('0xffffff');
  //
  //     this.turma_icon.setFillStyle('0xffffff');
  //
  //     this.flag = 2;
  //     updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this);
  //
  //   });
  //
  //   this.escola_filtro.input.hitArea.setTo(-50, -5, this.escola_filtro.width + 60, this.escola_filtro.height);
  //   this.escola_filtro.on('pointerdown', () => {
  //
  //     this.todos_icon.setFillStyle('0xffffff');
  //
  //     this.escola_icon.setFillStyle('0x088A08');
  //
  //     this.turma_icon.setFillStyle('0xffffff');
  //
  //     this.flag = 1;
  //     updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this);
  //   });
  //
  //   this.turma_filtro.input.hitArea.setTo(-50, -5, this.turma_filtro.width + 60, this.turma_filtro.height);
  //
  //   this.turma_filtro.on('pointerdown', () => {
  //     this.todos_icon.setFillStyle('0xffffff');
  //
  //     this.escola_icon.setFillStyle('0xffffff');
  //
  //     this.turma_icon.setFillStyle('0x088A08');
  //
  //     this.flag = 0;
  //
  //     updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this);
  //   });
  //   this.filtro.visible = false;
  //   this.todos.visible = false;
  //   this.todos_icon.visible = false;
  //   this.escola_icon.visible = false;
  //   this.escola_filtro.visible = false;
  //   this.turma_icon.visible = false;
  //   this.turma_filtro.visible = false;
  //
  //   if (infoUser.user != '') {
  //     this.filtro.visible = true;
  //     this.todos.visible = true;
  //     this.todos_icon.visible = true;
  //     this.escola_icon.visible = true;
  //     this.escola_filtro.visible = true;
  //     this.turma_icon.visible = true;
  //     this.turma_filtro.visible = true;
  //     this.todos_icon.setFillStyle('0xffffff');
  //     this.escola_icon.setFillStyle('0xffffff');
  //     this.turma_icon.setFillStyle('0xffffff');
  //
  //   }
  //
  //   this.jogador = this.add.text(0, 0, 'Jogador', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
  //   this.jogador.setOrigin(0.3,1.5);
  //
  //   this.pontos = this.add.text(0, 0, 'Pontos', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
  //   this.pontos.setOrigin(0,1.5);
  //
  //   this.escola = this.add.text(0, 0, 'Escola', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
  //   this.escola.setOrigin(0.7,1.5);
  //
  //   this.turma = this.add.text(0, 0, 'Turma', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
  //   this.turma.setOrigin(1.146,1.5);
  //
  //   this.data = this.add.text(0, 0, 'Data', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
  //   this.data.setOrigin(2.28,1.5);
  //
  //   this.aGrid.placeAtIndex(77, this.jogador);
  //   this.aGrid.placeAtIndex(79, this.pontos);
  //   this.aGrid.placeAtIndex(82, this.escola);
  //   this.aGrid.placeAtIndex(85, this.turma);
  //   this.aGrid.placeAtIndex(87, this.data);
  // }
  //
  //
  // /**
  //  * Create array from scene data
  //  * @param {number} count number of items
  //  */
  // CreateItems(count) {
  //   var data = [];
  //   for (var i = 0; i < count; i++) {
  //     if (this.array[i] != "") {
  //       data.push({
  //         name: this.array[i],
  //       });
  //     }
  //   }
  //   if (this.array.length < 4) {
  //     return []
  //   }
  //   return data;
  // }
  //
  // /**
  //  * Select ranking year to check
  //  * @returns {data} Ranking information
  //  */
  // selectYear() {
  //   var data = []
  //
  //   var d = new Date();
  //   var m = d.getMonth();
  //   var n = d.getFullYear();
  //   if (m > 7) {
  //     var x = n;
  //     var y = n + 1;
  //   }
  //   else {
  //     var x = n - 1;
  //     var y = n;
  //   }
  //   let di = x + "-09-01";
  //   let df = y + "-08-31";
  //   let j = 15;
  //   for (let i = 2015; i < y; i++) {
  //
  //     data.push("" + j + "-" + (j + 1));
  //     j++;
  //   }
  //   data.push("Todos");
  //   data = data.reverse();
  //   return data;
  }
}
