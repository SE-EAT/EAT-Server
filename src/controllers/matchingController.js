import roomModel from "../models/roomModel";
import userModel from "../models/userModel";
import restaurantModel from "../models/restaurantModel";

let restaurant_list;
const THRESHOLD = 0.3;

export const home = (req, res) => {
  let tasteValue = 0;
  req.session.user.taste.forEach((current) => (tasteValue += current));
  if (tasteValue == 0) {
    return res.redirect("/users/taste");
  }
  return res.render("home", { pageTitle: "Home" });
};

export const main = async (req, res) => {
  const rooms = await roomModel
    .find({})
    .populate("restaurant")
    .populate("users");
  return res.render("main", { pageTitle: "Main", rooms });
};

const cosineSimilarity = (myTaste, otherTaste) => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += myTaste[i] * otherTaste[i];
  }
  const score = sum / 55;
  return score;
};

export const getAutoMatching = async (req, res) => {
  const { taste } = req.session.user;
  const rooms = await roomModel
    .find({ roomState: 0 })
    .populate("restaurant")
    .populate("users");
  let autoMatching_list = [];
  for (let i = 0; i < rooms.length; i++) {
    let score = cosineSimilarity(taste, rooms[i].users[0].taste);
    console.log("Score : ", score);
    if (score >= THRESHOLD) {
      autoMatching_list.push(rooms[i]);
    }
  }

  return res.render("autoMatching", {
    pageTitle: "Auto Matching",
    autoMatching_list,
  });
};

export const postAutoMatching = (req, res) => {};

export const getCreateRoom = (req, res) => {
  return res.render("createRoom", { pageTitle: "Create Room" });
};
export const postCreateRoom = async (req, res) => {
  const { category } = req.body;

  switch (category) {
    case "korea":
      restaurant_list = await restaurantModel.find({
        category: "한식",
      });
      break;
    case "china":
      restaurant_list = await restaurantModel.find({
        category: "중식",
      });
      break;
    case "japan":
      restaurant_list = await restaurantModel.find({
        category: "일식",
      });
      break;
    case "western":
      restaurant_list = await restaurantModel.find({
        category: "양식",
      });
      break;
    case "snack":
      restaurant_list = await restaurantModel.find({
        category: "분식",
      });
      break;
    case "chicken":
      restaurant_list = await restaurantModel.find({
        category: "치킨",
      });
      break;
    case "asian":
      restaurant_list = await restaurantModel.find({
        category: "아시안",
      });
      break;
    case "meat":
      restaurant_list = await restaurantModel.find({
        category: "고깃집",
      });
      break;
    case "drink":
      restaurant_list = await restaurantModel.find({
        category: "술집",
      });
      break;
    default:
  }
  return res.redirect("/matching/rooms/select");
};
export const getSelectRestaurant = (req, res) => {
  return res.render("selectRestaurant", {
    pageTitle: "Select Restaurant",
    restaurant_list,
  });
};
export const postSelectRestaurant = async (req, res) => {
  const { restaurant: id } = req.body;
  const { _id } = req.session.user;
  try {
    await userModel.findByIdAndUpdate(_id, {
      userState: 2,
    });
  } catch (error) {
    console.log("Error in postSelectRestaurant - find user");
    console.log(error);
  }
  let newRoom;
  try {
    newRoom = await roomModel.create({
      users: _id,
      restaurant: id,
      date: Date.now(),
      roomState: 0,
    });
  } catch (error) {
    console.log("Error in postSelectRestaurant - create room");
    console.log(error);
  }
  return res.redirect(`/matching/room/${newRoom.id}`);
};

export const joinRoom = async (req, res) => {
  const { id } = req.params; // id = 접속한 방의 ID
  const { _id, nickname } = req.session.user; // _id = 현재 로그인한 유저의 ID
  const roomInfo = await roomModel
    .findById(id)
    .populate("users")
    .populate("restaurant");
  const userInfo = await userModel.findById(_id);
  if (roomInfo.users.length == 1 && roomInfo.users[0]._id.toString() !== _id) {
    roomInfo.users.push(_id);
    try {
      await roomModel.updateOne(
        { _id: id },
        {
          users: roomInfo.users,
          roomState: 1,
        }
      );
    } catch (error) {
      return res.status(400).redirect("/matching");
    }
    userInfo.userState = 2;
    await userInfo.save();
  }
  return res.render("room", { pageTitle: "Room", roomInfo, nickname });
};
export const postJoinRoom = (req, res) => {};
