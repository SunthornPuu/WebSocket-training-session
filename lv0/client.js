const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    console.log("Connected to server");
}

function chatUpdate(data) {
    const div = document.getElementById("messages");
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = data;
    li.appendChild(p);
    div.appendChild(li);
}

socket.onmessage = (event) => {
    console.log("Received message from server: " + event.data);
    chatUpdate(event.data);
}

function sendMsg() {
    const message = document.getElementById("message").value;
    socket.send(message);
}

