import express from "express";
import {
  main,
  getAutoMatching,
  postAutoMatching,
  getCreateRoom,
  postCreateRoom,
  getSelectRestaurant,
  postSelectRestaurant,
  joinRoom,
  postJoinRoom,
} from "../controllers/matchingController";

const matchingRouter = express.Router();

matchingRouter.route("/").get(main);
matchingRouter
  .route("/automatching")
  .get(getAutoMatching)
  .post(postAutoMatching);
matchingRouter.route("/rooms").get(getCreateRoom).post(postCreateRoom);
matchingRouter
  .route("/rooms/select")
  .get(getSelectRestaurant)
  .post(postSelectRestaurant);
matchingRouter
  .route("/room/:id([0-9a-f]{24})")
  .get(joinRoom)
  .post(postJoinRoom);

export default matchingRouter;
