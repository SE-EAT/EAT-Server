import roomModel from "../models/roomModel";
import restaurantModel from "../models/restaurantModel";

let restaurant_list;

export const home = (req, res) => {
  let tasteValue = 0;
  req.session.user.taste.forEach((current) => (tasteValue += current));
  if (tasteValue == 0) {
    return res.redirect("/users/taste");
  }
  return res.render("home", { pageTitle: "Home" });
};

export const main = async (req, res) => {
  const rooms = await roomModel.find({}).populate("restaurant");
  return res.render("main", { pageTitle: "Main", rooms });
};

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
  const newRoom = await roomModel.create({
    users: _id,
    restaurant: id,
    date: Date.now(),
    roomState: 0,
  });
  return res.redirect(`/matching/room/${newRoom.id}`);
};
export const getJoinRoom = async (req, res) => {
  const { id } = req.params; // id = 접속한 방의 ID
  const { _id } = req.session.user; // _id = 현재 로그인한 유저의 ID
  const roomInfo = await roomModel
    .findById(id)
    .populate("users")
    .populate("restaurant");
  let updateRoomInfo;
  if (roomInfo.users.length == 1 && roomInfo.users[0]._id.toString() !== _id) {
    roomInfo.users.push(_id);
    try {
      await roomModel.updateOne(
        { _id: id },
        {
          users: roomInfo.users,
        }
      );
    } catch (error) {
      return res.status(400).redirect("/matching");
    }
  }
  updateRoomInfo = await roomModel
    .findById(id)
    .populate("users")
    .populate("restaurant");
  return res.render("room", { pageTitle: "Room", roomInfo, updateRoomInfo });
};
export const postJoinRoom = (req, res) => {};
