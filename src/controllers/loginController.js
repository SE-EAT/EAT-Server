import userModel from "../models/userModel";

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { ID, password } = req.body;
  const user = await userModel.findOne({ ID });
  if (!user) {
    req.flash("error", "An account with this email does not exists");
    return res.status(400).render("login", {
      pageTitle: "Login",
    });
  }
  res.redirect("/main");
};
