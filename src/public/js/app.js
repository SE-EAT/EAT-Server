const socket = io();
const form = document.querySelector("form");

try {
  socket.emit("newUserJoin", null, () => console.log("Client - New User Join"));
} catch (error) {
  console.log("Client Error : ", error);
}

const addUsers = (name, id, address, restaurant) => {
  const users = document.getElementById("users");
  const host = users.querySelector("a");
  if (host.innerText !== name) {
    const comma = document.createElement("span");
    comma.classList.add("comma");
    comma.innerText = ", ";
    const username = document.createElement("a");
    username.classList.add("guest");
    username.innerText = name;
    username.href = "#none";
    username.addEventListener("click", () =>
      window.open(`/users/${id}`, "_blank", "width=300, height=300")
    );
    users.appendChild(comma);
    users.appendChild(username);

    const iframe = document.getElementById("guestMap");
    if (iframe) {
      iframe.src = `https://map.kakao.com/?sName=${address}&eName=${restaurant}`;
    }
  }
};

const deleteUsers = (name) => {
  const users = document.getElementById("users");
  let out = users.querySelector("a");
  if (out.innerText !== name) {
    out = users.querySelector(".guest");
  }
  const comma = document.querySelector(".comma");
  users.removeChild(comma);
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
  addUsers(data.nickname, data.id, data.address, data.restaurant);
});
socket.on("bye", (data) => {
  addMessages(`Info - ${data.nickname}님이 나갔습니다`);
  deleteUsers(data.nickname);
});

socket.on("message", (msg) => {
  addMessages(msg);
});

form.addEventListener("submit", handleMessageSubmit);
