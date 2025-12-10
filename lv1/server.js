//server.js
const express = require("express");
const app = express();
app.use(express.static("public"))
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    console.log("Client connected");
    ws.on("message", messageFile => {
        const message = messageFile.toString();
        console.log(message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    })
})

server.listen(8080, () => {
    console.log("Server started");
})