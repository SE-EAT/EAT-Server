import express from "express";
import {
  getLogin,
  postLogin,
  getGmail,
  postGmail,
  getJoin,
  postJoin,
  getGmailAuth,
  postGmailAuth,
  logout,
} from "../controllers/userController";
import { home } from "../controllers/matchingController";

const rootRouter = express.Router();

rootRouter.route("/").get(getLogin).post(postLogin);
rootRouter.route("/join/gmail").get(getGmail).post(postGmail);
rootRouter.route("/join/gmailAuth").get(getGmailAuth).post(postGmailAuth);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/home").get(home);
rootRouter.route("/logout").get(logout);

export default rootRouter;
