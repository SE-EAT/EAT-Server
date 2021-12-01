import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import "dotenv/config";
import "./db";
import "./models/userModel";
import app from "./server";

const PORT = 5000;

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT}`);
// app.listen(PORT, handleListening);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on("connection", (socket) => {
  socket.send("Hello");
});

server.listen(PORT, handleListening);
