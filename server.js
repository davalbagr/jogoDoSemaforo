import {Game} from "./game.js";
import EventEmitter from "node:events";
import {Server} from "socket.io";
import express from "express";
import cors from "cors";
import {createServer} from "http";

const app = express();
app.use(cors());
app.use('/', express.static('dist'));
const http = createServer(app);
const io = new Server(http, {
    connectionStateRecovery: {}
});
http.listen(8080);

class Queue extends EventEmitter {
    constructor() {
        super();
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
        if (this.length > 1) {
            const p1 = this.dequeue();
            const p2 = this.dequeue();
            this.emit("ready", p1, p2);
        }
    }
    dequeue() {
        let item = this.elements[this.head];
        while (item === null) {
            this.head++;
            item = this.elements[this.head];
        }
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    get length() {
        return this.tail - this.head;
    }
}



const players = new Queue();

const opponents = new Map();
const games = new Map();
players.on("ready", (p1, p2) => {
    if (p1.disconnected && !p2.disconnected) {
        players.enqueue(p2);
        return;
    } else if (!p1.disconnected && p2.disconnected) {
        players.enqueue(p1);
        return;
    } else if (p1.disconnected && p2.disconnected) return;
    opponents[p1] = p2;
    opponents[p2] = p1;
    const game = new Game();
    games[[p1, p2]] = [p1, p2, game];
    games[[p2, p1]] = [p1, p2, game];
    p1.emit("update", game.board.board, game.turn, false);
    p2.emit("update", game.board.board, !game.turn, false);
})
function makeMove(socket, pos) {
    const opponent = opponents[socket];
    const temp = games[[socket, opponent]];
    if (temp === undefined) return;
    const p1 = temp[0];
    const p2 = temp[1];
    const game = temp[2];
    if (game.turn && socket !== p1) return;
    if (!game.turn && socket !== p2) return;
    const t = game.makeMove(pos);
    if (t == null) return;
    p1.emit("update", game.board.board, game.turn, t);
    p2.emit("update", game.board.board, !game.turn, t);
    if (t) {
        games.delete([p1, p2]);
        games.delete([p2, p1]);
        opponents.delete(opponent);
        opponents.delete(socket);
        opponent.disconnect();
        socket.disconnect();
    }
}

function cleanup(socket) {
    const opponent = opponents[socket];
    if (opponent === undefined) {return; }
    const [p1, p2, game] = games[[socket, opponent]];
    if (game === undefined) {return;}
    if (p1 !== socket) p1.emit("update", game.board.board, false, true);
    if (p2 !== socket) p2.emit("update", game.board.board, false, true);
    games.delete([p1, p2]);
    games.delete([p2, p1]);
    opponents.delete(p1);
    opponents.delete(p2);
    opponent.disconnect();
}

io.on("connection", (socket) => {
    players.enqueue(socket);
    socket.on("disconnect", () => {
        cleanup(socket);
    })
    socket.on("move", (pos) => {
        makeMove(socket, pos);
    })
})