import express from "express";
import {createServer} from "http";

const app = express();
app.use('/', express.static('dist'));
const http = createServer(app);
http.listen(8080);