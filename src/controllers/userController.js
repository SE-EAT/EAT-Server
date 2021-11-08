import userModel from "../models/userModel";

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = (req, res) => {
  res.redirect("/main");
};
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { ID, password, password_confirm, email, nickname } = req.body;

  const checkExistedID = await userModel.exists({ ID });
  if (checkExistedID) {
    return res
      .status(400)
      .render("join", {
        pageTitle: "Join",
        errorMessage: "This ID is already taken.",
      });
  }
  const checkExistedEmail = await userModel.exists({ email });
  if (checkExistedEmail) {
    return res
      .status(400)
      .render("join", {
        pageTitle: "Join",
        errorMessage: "This email is already taken.",
      });
  }
  const checkExistedNickname = await userModel.exists({ nickname });
  if (checkExistedNickname) {
    return res
      .status(400)
      .render("join", {
        pageTitle: "Join",
        errorMessage: "This nickname is already taken.",
      });
  }
  if (password !== password_confirm) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match.",
    });
  }
  try {
    await userModel.create({
      ID,
      password,
      password_confirm,
      email,
      nickname,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._messages,
    });
  }
  return res.redirect("/");
};
export const getMain = (req, res) => {
  res.send("Main");
};
