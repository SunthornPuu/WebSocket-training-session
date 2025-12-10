//client.js
const ws = new WebSocket("ws://localhost:8080");

function echo_() {
    const message = document.getElementById("message").value;
    ws.send(message);
}

ws.onmessage = function (event) {
    const p = document.createElement("p");
    p.textContent = event.data;
    document.getElementById("board").appendChild(p);
}