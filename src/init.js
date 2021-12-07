import http from "http";
import SocketIO from "socket.io";
import "dotenv/config";
import "./db";
import "./models/userModel";
import app from "./server";
import roomModel from "./models/roomModel";
import userModel from "./models/userModel";

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${process.env.PORT}`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", async (socket) => {
  let roomID;
  let room;
  roomID = socket.handshake.headers.referer.substring(36);
  try {
    room = await roomModel
      .findById(roomID)
      .populate("users")
      .populate("restaurant");

    socket.on("newUserJoin", (n, done) => {
      done();
      socket.join(roomID);
      socket.name = room.users[room.users.length - 1].nickname;
      console.log("In Socket : ", socket.name);
      socket.to(roomID).emit("welcome", {
        name: "SERVER",
        message: `Info - ${socket.name}님이 입장하셨습니다.`,
      });
      wsServer.sockets.to(roomID).emit("nickname", {
        name: "SERVER",
        nickname: socket.name,
        id: room.users[room.users.length - 1]._id,
        address: room.users[room.users.length - 1].address,
        restaurant: room.restaurant.name,
      });
    });

    socket.on("disconnecting", async () => {
      socket.rooms.forEach((room) =>
        socket.to(room).emit("bye", {
          name: "SERVER",
          nickname: socket.name,
        })
      );
      try {
        room = await roomModel.findById(roomID).populate("users");
        let leftUser;
        console.log("Out Socket : ", socket.name);
        if (room.users[0].nickname === socket.name) {
          leftUser = await userModel.findById(room.users[0].id);
          leftUser.userState = 1;
          room.users.shift();
        } else {
          leftUser = await userModel.findById(room.users[1].id);
          leftUser.userState = 1;
          room.users.pop();
        }
        await leftUser.save();
        room.roomState = 0;
        if (room.users.length === 0) {
          try {
            await roomModel.deleteOne({ _id: roomID });
          } catch (error) {
            console.log(error);
          }
        } else {
          await room.save();
        }
      } catch (error) {
        console.log(error);
      }
      socket.leave(roomID);
    });

    socket.on("new_message", (msg, done) => {
      socket.to(roomID).emit("message", msg);
      done();
    });
  } catch (error) {
    console.log(error);
  }
});

httpServer.listen(process.env.PORT, handleListening);
