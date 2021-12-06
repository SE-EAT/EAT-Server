import express from "express";
import {
  profile,
  openProfile,
  getEditProfile,
  postEditProfile,
  getTaste,
  postTaste,
  getInitialTaste,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").get(profile);
userRouter.route("/:id([0-9a-f]{24})").get(openProfile);
userRouter.route("/edit").get(getEditProfile).post(postEditProfile);
userRouter.route("/taste").get(getTaste).post(postTaste);
userRouter.route("/taste/initial").get(getInitialTaste);

export default userRouter;
