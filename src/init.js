import "dotenv/config";
import "./db";
import userDB from "./models/userModel";
import app from "./server";

const PORT = 5000;

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT}`);
app.listen(PORT, handleListening);
