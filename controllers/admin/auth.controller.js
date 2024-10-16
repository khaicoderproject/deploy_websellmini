const accountModel = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
module.exports.login = async (req, res) => {
  const user = await accountModel.findOne({ token: req.cookies.token });
  if (user) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    return;
  }
  res.render("admin/pages/auth/login");
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await accountModel.findOne({ email: email, deleted: false });
  if (!user) {
    req.flash("error", "Email không có trong hệ thống!");
    res.redirect("back");
    return;
  }

  if (md5(password) !== user.password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);
  req.flash("success", `Xin chào ${user.fullname}!`);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
