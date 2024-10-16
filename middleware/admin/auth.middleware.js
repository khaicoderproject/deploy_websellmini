const systemConfig = require("../../config/system");
const accountModel = require("../../models/account.model");
const roleModel = require("../../models/role.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    // console.log(req.cookies.token);
    const user = await accountModel
      .findOne({ token: req.cookies.token })
      .select("-password ");
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
    const role = await roleModel.findOne({ _id: user.role_id });
    res.locals.user = user;
    res.locals.role = role;
    next();
  }
};
