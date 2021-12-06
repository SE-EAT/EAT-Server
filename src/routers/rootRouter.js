import express from "express";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
} from "../controllers/userController";
import { home } from "../controllers/matchingController";

const rootRouter = express.Router();

rootRouter.route("/").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/home").get(home);
rootRouter.route("/logout").get(logout);

export default rootRouter;
