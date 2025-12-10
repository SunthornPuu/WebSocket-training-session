//index.js
const ws = new WebSocket("ws://localhost:3000");


function login() {
    const username = document.querySelector("#username").value;
    ws.send(username);
}

function send() {
    const message = document.querySelector("#message").value;
    ws.send(message);
}

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.username === "Server") {
        document.querySelector("#loginPage").style.display = "none";
        document.querySelector("#chatPage").style.display = "block";
    }
    else {
        const messages = document.querySelector("#messages");
        const p = document.createElement("p");
        const username = document.createElement("h2");
        username.appendChild(document.createTextNode(data.username));
        p.appendChild(username);
        const message = document.createElement("p");
        message.appendChild(document.createTextNode(data.message));
        p.appendChild(message);
        messages.appendChild(p);
    }
}