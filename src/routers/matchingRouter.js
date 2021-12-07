import express from "express";
import {
  main,
  autoMatching,
  getCreateRoom,
  postCreateRoom,
  getSelectRestaurant,
  postSelectRestaurant,
  joinRoom,
  ready_start,
} from "../controllers/matchingController";

const matchingRouter = express.Router();

matchingRouter.route("/").get(main);
matchingRouter.route("/automatching").get(autoMatching);
matchingRouter.route("/rooms").get(getCreateRoom).post(postCreateRoom);
matchingRouter
  .route("/rooms/select")
  .get(getSelectRestaurant)
  .post(postSelectRestaurant);
matchingRouter.route("/room/:id([0-9a-f]{24})").get(joinRoom).post(ready_start);

export default matchingRouter;
