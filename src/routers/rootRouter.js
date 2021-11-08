import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  getFind,
  getMain,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.route("/").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);
// rootRouter.route("/find").get(getFind);
rootRouter.route("/main").get(getMain);

export default rootRouter;
