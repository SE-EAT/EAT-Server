import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
});

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);
export default restaurantModel;
