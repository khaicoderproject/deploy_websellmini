const userOtpModel = require("../../models/userOtp.model");
const md5 = require("md5");
const userModel = require("../../models/user.model");
const cartModel = require("../../models/cart.model");
const generateHelper = require("../../helpers/generate");
const userOtp = require("../../models/userOtp.model");
const sendMailHelper = require("../../helpers/sendMail");
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login");
};
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register");
};
module.exports.registerPost = async (req, res) => {
  const existEmail = await userModel.findOne({ email: req.body.email });
  if (existEmail) {
    req.flash("error", "Email đã tồn tại trong hệ thống!");
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new userModel(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  console.log(req.cookies);
  res.redirect("/");
};

module.exports.loginPost = async (req, res) => {
  const checkLogin = await userModel.findOne({ email: req.body.email });
  if (!checkLogin) {
    req.flash("error", "Email không tồn tài trong hệ thống!");
    res.redirect("back");
    return;
  }
  if (md5(req.body.password) !== checkLogin.password) {
    req.flash("error", "Mật khẩu không chính xác!");
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser", checkLogin.tokenUser);
  await cartModel.updateOne(
    { _id: req.cookies.cartId },
    { user_id: checkLogin._id }
  );

  res.redirect("/");
};

module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  res.clearCookie("tokenUser");
  res.redirect("/");
};

module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password");
};
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email không tồn tài trong hệ thống!");
    res.redirect("back");
    return;
  }
  const otp = generateHelper.generateRandomNumber(8);
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + 300000,
  };
  const userOtp = new userOtpModel(objectForgotPassword);
  await userOtp.save();
  //nodemailer
  const subject = `Mã OTP lấy lại mật khẩu.`;
  const html = `Mã OTP của bạn là <b>${otp}</b>. Mã sẽ hết hiệu lực sau 5p.`;
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};
module.exports.otpPassword = (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    email: email,
  });
};
module.exports.otpPasswordPost = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const otpUser = await userOtpModel.findOne({ otp: otp });
  if (!otpUser) {
    req.flash("error", "Mã OTP không chính xác!");
    res.redirect("back");
    return;
  }
  const user = await userModel.findOne({ email: email }).select("tokenUser");
  if (!user) {
    req.flash("error", "Không tìm thấy người dùng với email này!");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};

module.exports.resetPassword = (req, res) => {
  res.render("client/pages/user/reset-password");
};
module.exports.resetPasswordPost = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await userModel.findOne({ tokenUser: tokenUser });
  if (!user) {
    req.flash("error", "Tài khoản không hợp lệ!");
    res.redirect("back");
    return;
  }
  await userModel.updateOne(
    { tokenUser: tokenUser },
    {
      password: md5(req.body.password),
    }
  );
  res.redirect("/");
};

module.exports.info = async (req, res) => {
  res.render("client/pages/user/info");
};
