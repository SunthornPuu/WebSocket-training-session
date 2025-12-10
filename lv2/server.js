//server.js
const express = require("express");
const app = express();
app.use(express.static("public"));
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    let username = "not logged in";
    console.log("Client connected");
    ws.on("message", (messageData) => {
        const message = messageData.toString();
        if (username === "not logged in") {
            username = message;
            console.log("Log in request received");
            ws.send(JSON.stringify({ username: "Server", message: "Welcome to the chat" }));
        }
        else {
            console.log("Message received");
            ws.send(JSON.stringify({ username, message }));
        }
    })
})

server.listen(3000, () => {
    console.log("Server started");
})
