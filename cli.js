import { vsCPU } from "./engine.js";

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
        rl.question("Enter the position (0-11): ", resolve),
      );
      const pos = parseInt(input);
      t = game.makeMove(pos);
    } else {
      console.log("AI's turn ...");
      const temp = game.cpuMove();
      t = game.makeMove(temp);
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
