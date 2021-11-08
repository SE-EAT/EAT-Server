import express from "express";
import { getLogin, postLogin } from "../controllers/loginController";
import { getJoin, postJoin } from "../controllers/joinController";
import { getMain } from "../controllers/matchingController";

const rootRouter = express.Router();

rootRouter.route("/").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);
// rootRouter.route("/find").get(getFind);
rootRouter.route("/main").get(getMain);

export default rootRouter;
