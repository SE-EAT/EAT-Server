const socket = io();
const form = document.querySelector("form");

socket.emit("newUserJoin");

const addUsers = (name, id) => {
  const users = document.getElementById("users");
  const host = users.querySelector("a");
  if (host.innerText !== name) {
    const username = document.createElement("a");
    username.classList.add("guest");
    username.innerText = name;
    username.href = `/users/${id}`;
    users.appendChild(username);
  }
};

const deleteUsers = (name) => {
  const users = document.getElementById("users");
  let out = users.querySelector("a");
  if (out.innerText !== name) {
    console.log("");
    out = users.querySelector(".guest");
  }
  users.removeChild(out);
};

const addMessages = (message) => {
  const chat_list = document.getElementById("chat_list");
  const chat = document.createElement("p");
  chat.innerText = message;
  chat_list.appendChild(chat);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  const message = input.value;
  socket.emit("new_message", message, () => {
    addMessages(`You : ${message}`);
  });
  input.value = "";
};

socket.on("welcome", (data) => {
  if (data.name === "SERVER") {
    addMessages(data.message);
  }
});
socket.on("nickname", (data) => {
  addUsers(data.nickname, data.id);
});
socket.on("bye", (data) => {
  addMessages(`${data.nickname}님이 나갔습니다`);
  deleteUsers(data.nickname);
});

socket.on("message", (msg) => {
  addMessages(msg);
});

form.addEventListener("submit", handleMessageSubmit);
