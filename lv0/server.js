const express = require("express");
const http = require("http");
const app = express();
const WebSocket = require("ws");

//make the app middleware return static files from the public folder
app.use(express.static("public"));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    //ws is an argument for each connection
    console.log("Client connected");
    ws.on("message", (message) => {
        //so consider each message from each connection
        data = message.toString();
        console.log("received: " + data);
        wss.clients.forEach((clients) => {
            //and broadcast to all clients
            if (clients.readyState === WebSocket.OPEN) {
                clients.send(data);
            }
        });
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
})

server.listen(8080, () => {
    console.log("Server started");
})