import userModel from "../models/userModel";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { ID, password, password_confirm, email, nickname, taste } = req.body;

  const checkExistedID = await userModel.exists({ ID });
  if (checkExistedID) {
    // req.flash("error", "This ID is already taken");
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This ID is already taken.",
    });
  }
  const checkExistedEmail = await userModel.exists({ email });
  if (checkExistedEmail) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This email is already taken.",
    });
  }
  const checkExistedNickname = await userModel.exists({ nickname });
  if (checkExistedNickname) {
    return res.status(400).render("join", {
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
  if (!email.includes("@ajou.ac.kr")) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Domain of Email must be @ajou.ac.kr",
    });
  }
  try {
    await userModel.create({
      ID,
      password,
      password_confirm,
      email,
      nickname,
      taste,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._messages,
    });
  }
  return res.redirect("/");
};
