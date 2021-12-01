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
  const rooms = await roomModel.find({});
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
    roomState: 1,
  });
  return res.redirect(`/matching/room/${newRoom.id}`);
};
export const getJoinRoom = (req, res) => {
  console.log(req);
  return res.render("room", { pageTitle: "Room" });
};
export const postJoinRoom = (req, res) => {};

// export const getSelectRestaurant = async (req, res) => {
//   const restaurant_korean = await restaurantModel.find({
//     category: "한식",
//   });
//   const restaurant_chinese = await restaurantModel.find({
//     category: "중식",
//   });
//   const restaurant_japanese = await restaurantModel.find({
//     category: "일식",
//   });
//   const restaurant_western = await restaurantModel.find({
//     category: "양식",
//   });
//   const restaurant_snack = await restaurantModel.find({
//     category: "분식",
//   });
//   const restaurant_chicken = await restaurantModel.find({
//     category: "치킨",
//   });
//   const restaurant_asian = await restaurantModel.find({
//     category: "아시안",
//   });
//   const restaurant_meat = await restaurantModel.find({
//     category: "고깃집",
//   });
//   const restaurant_drink = await restaurantModel.find({
//     category: "술집",
//   });

//   switch (category) {
//     case "korea":
//       const restaurant_korean = await restaurantModel.find({
//         category: "한식",
//       });
//       break;
//     case "china":
//       const restaurant_chinese = await restaurantModel.find({
//         category: "중식",
//       });
//       break;
//     case "japan":
//       const restaurant_japanese = await restaurantModel.find({
//         category: "일식",
//       });
//       break;
//     case "western":
//       const restaurant_western = await restaurantModel.find({
//         category: "양식",
//       });
//       break;
//     case "snack":
//       const restaurant_snack = await restaurantModel.find({
//         category: "분식",
//       });
//       break;
//     case "chicken":
//       const restaurant_chicken = await restaurantModel.find({
//         category: "치킨",
//       });
//       break;
//     case "asian":
//       const restaurant_asian = await restaurantModel.find({
//         category: "아시안",
//       });
//       break;
//     case "meat":
//       const restaurant_meat = await restaurantModel.find({
//         category: "고깃집",
//       });
//       break;
//     case "drink":
//       const restaurant_drink = await restaurantModel.find({
//         category: "술집",
//       });
//       break;
//     default:
//   }
// };
