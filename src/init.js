import http from "http";
import SocketIO from "socket.io";
import "dotenv/config";
import "./db";
import "./models/userModel";
import app from "./server";
import roomModel from "./models/roomModel";

const PORT = 5000;

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT}`);
// app.listen(PORT, handleListening);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", async (socket) => {
  let roomID;
  roomID = socket.handshake.headers.referer.substring(36);
  let room = await roomModel.findById(roomID).populate("users");
  socket.on("newUserJoin", () => {
    socket.join(roomID);
    socket.name = room.users[room.users.length - 1].nickname;
    socket.to(roomID).emit("welcome", {
      name: "SERVER",
      message: `${socket.name}님이 입장하셨습니다.`,
    });
    wsServer.sockets.to(roomID).emit("nickname", {
      name: "SERVER",
      nickname: socket.name,
      id: room.users[room.users.length - 1]._id,
    });
  });
  socket.on("disconnecting", async () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", {
        name: "SERVER",
        nickname: socket.name,
      })
    );
    room = await roomModel.findById(roomID).populate("users");
    if (room.users[0].nickname === socket.name) {
      room.users.shift();
    } else {
      room.users.pop();
    }
    if (room.users.length === 0) {
      await roomModel.deleteOne({ _id: roomID });
    }
    room.save();
  });
  socket.on("new_message", (msg, done) => {
    socket.to(roomID).emit("message", msg);
    done();
  });
});

// wsServer.on("connection", (socket) => {
//   let roomID;
//   socket.on("newUserJoin", async () => {
//     roomID = socket.handshake.headers.referer.substring(36);
//     socket.join(roomID);
//     const room = await roomModel.findById(roomID).populate("users");
//     socket.name = room.users[room.users.length - 1].nickname;
//     socket.to(roomID).emit("welcome", {
//       name: "SERVER",
//       message: `${socket.name}님이 입장하셨습니다.`,
//     });
//     wsServer.sockets.to(roomID).emit("nickname", {
//       name: "SERVER",
//       nickname: socket.name,
//       id: room.users[room.users.length - 1]._id,
//     });
//   });
//   socket.on("disconnecting", () => {
//     socket.rooms.forEach((room) => socket.to(room).emit("bye"));
//   });
//   socket.on("new_message", (msg, done) => {
//     socket.to(roomID).emit("message", msg);
//     done();
//   });
// });

httpServer.listen(PORT, handleListening);
