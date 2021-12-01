// import restaurantModel from "../../models/restaurantModel";

// const detail = (category) => {
//   let restaurant;
//   let korean = [
//     "국수촌",
//     "고봉민김밥인",
//     "맛보래",
//     "새금강곱창전골",
//     "참큰곤드레순대국",
//     "양지식당",
//   ];
//   //   korean = await restaurantModel.find({
//   //     category: "한식",
//   //   });
//   const target = document.getElementById("restaurant");

//   if (category.value == "korea") {
//     console.log("한식 선택!");
//     restaurant = korean;
//   }
//   // else if(category.value == "china"){

//   // }else if(category.value == "japan"){

//   // }else if(category.value == "western"){

//   // }else if(category.value == "snack"){

//   // }else if(category.value == "chicken"){

//   // }else if(category.value == "asian"){

//   // }else if(category.value == "meat"){

//   // }else if(category.value == "drink"){

//   // }

//   target.options.length = 0;

//   for (x in restaurant) {
//     const option = document.createElement("option");
//     option.value = restaurant[x].name;
//     option.innerText = restaurant[x].name;
//     target.appendChild(option);
//   }
// };
