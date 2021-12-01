import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  date: { type: Date, required: true, default: Date.now },
  roomState: { type: Number, required: true, default: 0 },
});

const roomModel = mongoose.model("Room", roomSchema);
export default roomModel;
