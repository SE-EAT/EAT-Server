import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  ID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  studentID: { type: String, required: true },
  sex: { type: String, required: true },
  address: { type: String, required: true },
  taste: [{ type: Number, required: true }],
  userState: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
