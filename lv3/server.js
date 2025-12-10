//server.js
const express = require("express");
const app = express();
app.use(express.static("public"));
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

let users = new Set();

wss.on("connection", (ws) => {
    let username = "-";
    console.log("Client connected");
    ws.on("message", (data) => {
        const message = JSON.parse(data.toString());
        console.log(message);
        if (message.type === "login") {
            if (users.has(message.data)) {
                ws.send(JSON.stringify({ type: "status", data: "failed" }));
            }
            else {
                users.add(message.data);
                username = message.data;
                ws.send(JSON.stringify({ type: "status", data: "succeed" }));
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "userJoin", data: username }));
                    }
                })
            }
        }
        else if (message.type === "message") {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "message", data: { username, message: message.data } }));
                }
            })
        }
        else if (message.type === "checkList") {
            ws.send(JSON.stringify({ type: "userList", data: (Array.from(users)).toString() }));
        }
    })
    ws.on("close", () => {
        console.log("Client disconnected");
        users.delete(username);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: "userLeave", data: username }));
            }
        })
    })
})

server.listen(3000, () => {
    console.log("Server started");
})
