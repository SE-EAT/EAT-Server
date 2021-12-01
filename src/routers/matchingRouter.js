import express from "express";
import {
  home,
  main,
  getCreateRoom,
  postCreateRoom,
  getSelectRestaurant,
  postSelectRestaurant,
  getJoinRoom,
  postJoinRoom,
} from "../controllers/matchingController";

const matchingRouter = express.Router();

matchingRouter.route("/").get(main);
matchingRouter.route("/rooms").get(getCreateRoom).post(postCreateRoom);
matchingRouter
  .route("/rooms/select")
  .get(getSelectRestaurant)
  .post(postSelectRestaurant);
matchingRouter
  .route("/room/:id([0-9a-f]{24})")
  .get(getJoinRoom)
  .post(postJoinRoom);

export default matchingRouter;
