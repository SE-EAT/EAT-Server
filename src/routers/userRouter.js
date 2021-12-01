import express from "express";
import {
  profile,
  getEditProfile,
  postEditProfile,
  getTaste,
  postTaste,
  getInitialTaste,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").get(profile);
userRouter.route("/edit").get(getEditProfile).post(postEditProfile);
userRouter.route("/taste").get(getTaste).post(postTaste);
userRouter.route("/taste/initial").get(getInitialTaste);

export default userRouter;
