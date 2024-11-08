module.exports.register = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập Họ và Tên!");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập Password!");
    res.redirect("back");
    return;
  }
  next();
};
module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập Password!");
    res.redirect("back");
    return;
  }
  next();
};
module.exports.forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect("back");
    return;
  }
  next();
};
module.exports.resetPassword = async (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect("back");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng nhập xác nhận mật khẩu!");
    res.redirect("back");
    return;
  }
  if (req.body.password !== req.body.confirmPassword) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect("back");
    return;
  }
  next();
};
