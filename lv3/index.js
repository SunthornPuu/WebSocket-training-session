//index.js
const ws = new WebSocket("ws://localhost:3000")

function login() {
    const username = document.querySelector("#username").value;
    ws.send(JSON.stringify({ type: "login", data: username }));
}

function changePage() {
    const loginPage = document.querySelector("#loginPage");
    const chatPage = document.querySelector("#chatPage");
    loginPage.style.display = "none";
    chatPage.style.display = "flex";
}

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "status") {
        if (message.data === "succeed") {
            changePage();
        }
        else {
            const status = document.querySelector("#status");
            status.style.display = "flex";

        }
    }
    else if (message.type === "message") {
        console.log(message);
        const messages = document.querySelector("#messages");
        const div = document.createElement("div");
        div.className = "message";
        const username = document.createElement("h2");
        username.textContent = message.data.username;
        div.appendChild(username);
        const p = document.createElement("p");
        p.textContent = message.data.message;
        div.appendChild(p);
        messages.appendChild(div);
    }
    else if (message.type === "userJoin") {
        const messages = document.querySelector("#messages");
        const p = document.createElement("p");
        p.className = "userMessage";
        p.textContent = message.data + " was joined!";
        messages.appendChild(p);
    }
    else if (message.type === "userLeave") {
        const messages = document.querySelector("#messages");
        const p = document.createElement("p");
        p.className = "userMessage";
        p.textContent = message.data + " was left!";
        messages.appendChild(p);
    }
    else if (message.type === "userList") {
        console.log(message.data);
        const userListContent = document.querySelector("#userListContent");
        const userList = document.querySelector("#userList");
        userList.style.display = "flex";
        userListContent.innerHTML = "";
        message.data.split(",").forEach((user) => {
            const p = document.createElement("p");
            p.textContent = user;
            userListContent.appendChild(p);
        })
    }
}

function sendMessage() {
    const message = document.querySelector("#message").value;
    ws.send(JSON.stringify({ type: "message", data: message }));
}

function showUserList() {
    ws.send(JSON.stringify({ type: "checkList" }));
}

function hideUserList() {
    const userList = document.querySelector("#userList");
    userList.style.display = "none";
}
